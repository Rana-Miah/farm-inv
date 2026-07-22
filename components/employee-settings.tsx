import { FlatList, Pressable, ScrollView, View, } from 'react-native'
import { Button } from './ui/button'
import { Text } from './ui/text'
import { inventoryDb } from '@/drizzle/db/inventory-db'
import { employeeTable, labelingTable } from '@/drizzle/schema/inventory'
import { invalidateEmployeeGetQuery } from '@/lib/tanstack-query/employee'
import { invalidateLabelingGetQuery } from '@/lib/tanstack-query/labeling'

import * as xlsx from 'xlsx'
import { ensureDbDir, getDirectory } from '@/lib/expo-file-system/directory-picker'
import { showSuccess } from '@/lib/toast/success'
import { getScannedItems } from '@/dal/item/get-item'
import { deleteScannedItems } from '@/dal/item/delete-items'
import { File } from 'expo-file-system'
import { CardDescription, CardHeader, CardTitle } from './ui/card'
import Lucide from '@react-native-vector-icons/lucide'
import { useEmployeesGetQuery } from '@/hooks/tanstack/mutation/employee'


const createXl = async () => {
    try {
        const ws = xlsx.utils.json_to_sheet([
            {
                barcode: "628569655824",
                item_code: "01010101-0001",
                description: "items-description1",
                expireIn: "12.08.26",
                itemShelfNo: "shelf-5"
            },
            {
                barcode: "628569655824",
                item_code: "01010101-0001",
                description: "items-description1",
                expireIn: "12.08.26",
                itemShelfNo: "shelf-5"
            },
            {
                barcode: "628569655824",
                item_code: "01010101-0001",
                description: "items-description1",
                expireIn: "12.08.26",
                itemShelfNo: "shelf-5"
            },
            {
                barcode: "628569655824",
                item_code: "01010101-0001",
                description: "items-description1",
                expireIn: "12.08.26",
                itemShelfNo: "shelf-5"
            },
            {
                barcode: "628569655824",
                item_code: "01010101-0001",
                description: "items-description1",
                expireIn: "12.08.26",
                itemShelfNo: "shelf-5"
            },
            {
                barcode: "628569655824",
                item_code: "01010101-0001",
                description: "items-description1",
                expireIn: "12.08.26",
                itemShelfNo: "shelf-5"
            },
        ])
        const wb = xlsx.utils.book_new()

        xlsx.utils.book_append_sheet(wb, ws, '50667')

        const wbout = xlsx.write(wb, {
            type: "base64",
            bookType: "xlsx",
        });

        const directory = await getDirectory()
        if (!directory) return
        const xlFile = await directory.createFile(
            'expiry-monitor.xlsx',
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )


        // Write to file
        await xlFile.write(wbout, {
            encoding: "base64",
        });

        showSuccess('created')
    } catch (error) {
        console.log(error)
    }

}


const EmployeeSettings = () => {
    const { data: employees } = useEmployeesGetQuery()

    const deleteInventoryDb = async () => {
        const directory = ensureDbDir()
        const list = directory.list()
        for (const f of list) {
            const file = new File(f.uri)
            directory.list()
            if (file.name === 'inventory.db' && file.exists) {
                file.delete()
            }
            console.log(file.name);
        }
    }



    return (
        <ScrollView>
            <View className='gap-3 '>

                <View className="gap-1">
                    <FlatList
                        data={employees ?? []}
                        keyExtractor={({ emp }) => emp.employeeId}
                        renderItem={({ item }) => {
                            return (
                                <EmployeeCard employeeId={item.emp.employeeId} employeeName={item.emp.name} />
                            )
                        }}
                    />
                </View>


                <Button onPress={async () => {
                    await inventoryDb.delete(employeeTable)
                    invalidateEmployeeGetQuery()
                }}>
                    <Text>Delete Emp</Text>
                </Button>
                <Button onPress={async () => {
                    await inventoryDb.delete(labelingTable)
                    invalidateLabelingGetQuery()
                }}>
                    <Text>Delete Labeling</Text>
                </Button>
                <Button onPress={createXl}>
                    <Text>create xl</Text>
                </Button>
                <Button onPress={getScannedItems}>
                    <Text>stored data</Text>
                </Button>
                <Button onPress={deleteScannedItems}>
                    <Text>delete scanned data</Text>
                </Button>
                <Button onPress={deleteInventoryDb}>
                    <Text>delete db</Text>
                </Button>
            </View>
        </ScrollView>
    )
}

export default EmployeeSettings



const EmployeeCard = (
    { employeeName, employeeId }: { employeeName: string, employeeId: string }
) => {

    return (
        <View className="flex-row flex-1 items-center justify-between gap-2 border border-muted rounded-lg shadow-black shadow-md px-4 py-2">
            <View>
                <CardTitle>{employeeId}</CardTitle>
                <CardDescription>{employeeName}</CardDescription>
            </View>
            <Pressable>

                <View className="rounded-full border border-muted bg-muted items-center justify-center p-3">
                    <Lucide
                        name='arrow-right'
                        size={20}
                    />
                </View>
            </Pressable>
        </View>
    )
}