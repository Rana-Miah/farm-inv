import { FlatList, View, } from 'react-native'
import Container from '@/components/shared/container'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useColorScheme } from 'nativewind'
import { ALERT_MODAL_TYPE, MODAL_TYPE, } from '@/constants'
import { saveOrder } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { saveFile } from '@/lib/expo-file-system/save-file'
import { useEmployeesGetQuery } from '@/hooks/tanstack/mutation/employee'
import { useModalAction } from '@/hooks/redux/use-modal'
import { useLabelingGetQuery } from '@/hooks/tanstack/mutation/labeling'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import ScannedItemCard from '@/components/shared/scanned-item-card'
import { Input } from '@/components/ui/input'
import { useGetScannedItems, useGetStoredScannedItemsSearch } from '@/hooks/tanstack/mutation/item/get-item'
import { useAlertModalActionWithPayload, useAlertModalWithPayload } from '@/hooks/redux/use-alert-modal'
import AlertModal from '@/components/shared/alert-modal'
import ItemListItemCard from '@/components/shared/item-list-item-card'
import { useDeleteItemById } from '@/hooks/tanstack/mutation/item/delete-item '
import { showSuccess } from '@/lib/toast/success'
import { queryClient } from '@/components/provider/tanstack-query-client'
import { MUTATION_KEY } from '@/constants/tanstack-query'
import { useUpdateItemById } from '@/hooks/tanstack/mutation/item/update-item'
import { showError } from '@/lib/toast/error'

const ItemsList = () => {
    const { data: employees } = useEmployeesGetQuery()
    const { data: label } = useLabelingGetQuery()
    const [inputValue, setInputValue] = useState({ search: "", title: "" })
    const { data: items, } = useGetScannedItems()
    const { data: searchItems } = useGetStoredScannedItemsSearch(inputValue.search)
    const { isAlertOpenWithPayload, payload } = useAlertModalWithPayload()
    const { onAlertOpenWithPayload, onAlertCloseWithPayload } = useAlertModalActionWithPayload()
    const { mutate: deleteItemById } = useDeleteItemById()
    const { mutate: updateItemById } = useUpdateItemById()

    const allItems = (inputValue.search.length > 0 ? searchItems?.data : items?.data?.scannedItems)

    const data = allItems ?? []



    const isUpdateAlert = isAlertOpenWithPayload &&
        payload &&
        payload.type ===
        ALERT_MODAL_TYPE.SCANNED_ITEM.UPDATE


    const isDeleteAlert = isAlertOpenWithPayload &&
        payload &&
        payload.type ===
        ALERT_MODAL_TYPE.SCANNED_ITEM.DELETE


    const alertTitle =
        `Sure? Item ${isUpdateAlert ? "quantity" : ""} will be ${isUpdateAlert ? `updated to ${payload.quantity} ${payload.uom}` : "deleted"}!`;
    const alertDescription = isDeleteAlert ?
        payload.description :
        isUpdateAlert ? `${payload.description} (Previous Quantity ${payload.previousQuantity} ${payload.uom})` : ""

    const onConfirm = () => {
        if (!payload) return showError('Payload missing to delete item!')
        if (isDeleteAlert) {
            deleteItemById(payload.id, {
                onSuccess(data) {
                    if (data.success) {
                        showSuccess(data.message)
                        onAlertCloseWithPayload()
                        queryClient.invalidateQueries({
                            queryKey: [MUTATION_KEY.SCANNED_ITEM.READ]
                        })
                    }
                }
            })
            return
        }
        if (isUpdateAlert) {
            updateItemById(
                {
                    id: payload.id,
                    quantity: payload.quantity
                },
                {
                    onSuccess(data) {
                        if (data.success) {
                            showSuccess(data.message)
                            onAlertCloseWithPayload()
                            queryClient.invalidateQueries({
                                queryKey: [MUTATION_KEY.SCANNED_ITEM.READ]
                            })
                        }
                    }
                }
            )
            return
        }

    };

    return (
        <Container>

            <AlertModal
                isOpen={!!isDeleteAlert || !!isUpdateAlert}
                title={alertTitle}
                description={alertDescription}
                onConfirm={onConfirm}
                onCancel={onAlertCloseWithPayload}
            />

            <View className='flex-1 justify-between py-2'>
                <View className='flex-1'>
                    {/* Inventory Save Form */}
                    <View className="h-20 gap-2">
                        <Input
                            className="flex-1"
                            placeholder="Item Title"
                            onChangeText={(text) => {
                                setInputValue(prev => ({ ...prev, title: text }))
                            }}
                            value={inputValue.title}
                        />
                        <Input
                            className="flex-1"
                            placeholder="Search"
                            onChangeText={(text) => {
                                setInputValue(prev => ({ ...prev, search: text }))
                            }}
                            value={inputValue.search}
                        />
                    </View>

                    {/* scanned items */}
                    <FlatList
                        className="pb-0 flex-1"
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) => (
                            <ItemListItemCard
                                key={item.id}
                                item={item}
                                enableActionBtn
                                isCollapseAble
                                defaultCollapse={index !== 0}
                                onDelete={(item) => {
                                    onAlertOpenWithPayload({
                                        type: ALERT_MODAL_TYPE.SCANNED_ITEM.DELETE,
                                        id: item.id,
                                        description: item.description,
                                    })
                                }}
                                onUpdate={(item) => {
                                    onAlertOpenWithPayload({
                                        type: ALERT_MODAL_TYPE.SCANNED_ITEM.UPDATE,
                                        id: item.id,
                                        description: item.description,
                                        previousQuantity: item.previousQuantity,
                                        quantity: String(item.quantity),
                                        uom: item.uom
                                    })
                                }}
                            />
                        )}
                    />
                </View>

                {/* below buttons */}
                <View className='bg-background flex-row justify-between items-center  rounded-md p-1 shadow-sm shadow-black/5'>
                    {/* INVENTORY */}
                    <Inventory invLabels={label?.invLabels ?? []} />
                    {/* TAGS */}
                    <Tag employees={employees ?? []} />
                    {/* ORDER */}
                    <Order orderLabels={label?.orderLabels ?? []} />

                    <Button
                        onPress={() => saveOrder()}
                        size={'sm'}
                        className='h-8'
                    >
                        <Text>Print</Text>
                    </Button>
                </View>

            </View>
        </Container>
    )
}

export default ItemsList


const Inventory = ({ invLabels }: {
    invLabels: {
        id: string;
        label: string;
        saveFlag: "Inventory" | "Order";
        createdAt: Date;
        updatedAt: Date;
        onPress: (prefix: string) => Promise<void>;
    }[]
}) => {

    const { colorScheme } = useColorScheme();
    const { onOpen } = useModalAction()

    return (
        <View className="flex-row">
            <Button
                onPress={() => saveFile('Tags')}
                className='rounded-r-none h-8 pr-1.5'
                size={'sm'}
            >
                <Text>Inv</Text>
            </Button>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button
                        className='rounded-l-none h-8 pl-2'
                        size={'sm'}
                    >
                        <Text>
                            <FontAwesome6 name='arrow-down' iconStyle='solid'
                                color={colorScheme === 'dark' ? 'black' : 'white'}
                            />
                        </Text>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top'>
                    <DropdownMenuItem
                        onPress={() => onOpen(MODAL_TYPE.LABELING.CREATE)}
                        className='flex-row'
                    >
                        <FontAwesome6 name='circle-plus' iconStyle='solid' color={colorScheme === 'dark' ? 'white' : 'black'}
                        />
                        <Text className='font-semibold'>Add New</Text>
                    </DropdownMenuItem>
                    <Separator />
                    {
                        invLabels.map(({ id, label: menuItem, onPress }, i) => (
                            <View key={id}>
                                <DropdownMenuItem onPress={() => onPress(menuItem)}>
                                    <Text className='font-semibold'>{menuItem}</Text>
                                </DropdownMenuItem>
                                {invLabels.length !== i + 1 && <Separator />}
                            </View>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </View>
    )
}

const Order = ({ orderLabels }: {
    orderLabels: {
        id: string;
        label: string;
        saveFlag: "Inventory" | "Order";
        createdAt: Date;
        updatedAt: Date;
        onPress: (prefix: string) => Promise<void>;
    }[]
}) => {

    const { colorScheme } = useColorScheme();
    const { onOpen } = useModalAction()

    return (
        <View className="flex-row">
            <Button
                onPress={() => saveOrder()}
                className='rounded-r-none h-8 pr-1.5'
                size={'sm'}
            >
                <Text>Order</Text>
            </Button>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button
                        className='rounded-l-none h-8 pl-2'
                        size={'sm'}
                    >
                        <Text>
                            <FontAwesome6 name='arrow-down' iconStyle='solid'
                                color={colorScheme === 'dark' ? 'black' : 'white'}
                            />
                        </Text>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top'>
                    <DropdownMenuItem onPress={() => onOpen(MODAL_TYPE.LABELING.CREATE)} className='flex-row'
                    >
                        <FontAwesome6 name='circle-plus' iconStyle='solid' color={colorScheme === 'dark' ? 'white' : 'black'}
                        />
                        <Text className='font-semibold'>Add New</Text>
                    </DropdownMenuItem>
                    {
                        orderLabels.map(({ id, label: menuItem, onPress }, i) => (
                            <View key={id}>
                                <DropdownMenuItem
                                    onPress={() => onPress(menuItem)}>
                                    <Text className='font-semibold'>{menuItem}</Text>
                                </DropdownMenuItem>
                                {orderLabels.length !== i + 1 && <Separator />}
                            </View>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </View>
    )
}

const Tag = ({ employees }: {
    employees: {
        emp: {
            employeeId: number;
            name: string;
            employeeTitle: string;
            createdAt: Date;
            updatedAt: Date;
        };
        onPress: (prefix: string) => Promise<void>;
    }[]
}) => {
    const { colorScheme } = useColorScheme();
    const { onOpen } = useModalAction()

    const router = useRouter()

    return (
        <View className="flex-row">
            <Button
                onPress={() => saveFile('Tags')}
                className='rounded-r-none h-8 pr-1.5'
                size={'sm'}
            >
                <Text>Tags</Text>
            </Button>
            <DropdownMenu  >
                <DropdownMenuTrigger asChild>
                    <Button
                        className='rounded-l-none h-8 pl-2'
                        size={'sm'}
                    >
                        <Text>
                            <FontAwesome6 name='arrow-down' iconStyle='solid'
                                color={colorScheme === 'dark' ? 'black' : 'white'}
                            />
                        </Text>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top'>
                    <DropdownMenuItem onPress={() => onOpen(MODAL_TYPE.EMPLOYEE.CREATE)} className='flex-row'
                    >
                        <FontAwesome6 name='circle-plus' iconStyle='solid' color={colorScheme === 'dark' ? 'white' : 'black'}
                        />
                        <Text className='font-semibold'>Add New</Text>
                    </DropdownMenuItem>
                    <Separator />
                    {
                        employees?.map(({ emp, onPress }, i) => (
                            <View key={emp.employeeId}>
                                <DropdownMenuItem
                                    onPress={() => onPress(`tag-${emp.name}`)}
                                    onLongPress={(c) => router.push(`/employee/${emp.employeeId}`)}
                                >
                                    <Text className='font-semibold'>{emp.name}</Text>
                                </DropdownMenuItem>
                                {employees?.length !== i + 1 && <Separator />}
                            </View>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </View>
    )
}