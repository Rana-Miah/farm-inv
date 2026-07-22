import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import InputField from '../shared/input-field'
import { Button } from '../ui/button'
import Lucide from '@react-native-vector-icons/lucide'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '../ui/select'
import { useLocalSearchParams } from 'expo-router'

export const expiryScanFormSchema = z.object({
    barcode: z.string().trim().nonempty(),
    expireIn: z.string().trim().nonempty().min(6, { error: 'Minimum 6 characters long!' }).max(10, { error: 'Maximum 10 characters long!' }),
    remindBefore: z.string().trim().nonempty(),
    shelfNo: z.string().trim().nonempty(),
})

export type ExpireScanFormValue = z.infer<typeof expiryScanFormSchema>

export const ExpiryScanForm = () => {

    const { empId } = useLocalSearchParams()
    const [triggerWidth, setTriggerWidth] = React.useState(0);
    const barcodeRef = useRef<any>(null)
    const expireInRef = useRef<any>(null)
    const remindBeforeRef = useRef<any>(null)
    const shelfNoRef = useRef<any>(null)



    const form = useForm<ExpireScanFormValue>({
        defaultValues: {
            barcode: "",
            expireIn: "",
            remindBefore: "",
            shelfNo: ""
        },
        resolver: zodResolver(expiryScanFormSchema),
        shouldFocusError: false,
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })

    return (
        <Form
            {...form}
        >
            <View className="gap-2">

                {/* REMIND_BEFORE & SHELF_NO FIELD */}
                <View className='flex-row items-center justify-between gap-2'>

                    {/* SHELF_NO FIELD */}
                    <View className="flex-row flex-1 items-center">
                        <FormField
                            control={form.control}
                            name='shelfNo'
                            render={({ field }) => (
                                <View className='flex-1'>
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                onValueChange={(option) => {
                                                    field.onChange(option?.value);
                                                }}
                                                value={
                                                    field.value ? {
                                                        value: field.value,
                                                        label: field.value
                                                    } : undefined
                                                }
                                                ref={shelfNoRef}
                                            >
                                                <SelectTrigger
                                                    onLayout={(e) =>
                                                        setTriggerWidth(e.nativeEvent.layout.width)
                                                    }
                                                >
                                                    <SelectValue placeholder="Select a shelf no" />
                                                </SelectTrigger>
                                                <SelectContent
                                                    style={{ width: triggerWidth }}
                                                    className="mt-2">
                                                    <SelectGroup >
                                                        <SelectLabel>Shelf No</SelectLabel>
                                                        <SelectSeparator />

                                                        <SelectItem
                                                            value="B1"
                                                            label="B1"
                                                        />
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </View>
                            )}
                        />
                    </View>

                    {/* REMIND_BEFORE FIELD */}
                    <View className="flex-row flex-1 items-center">
                        <FormField
                            control={form.control}
                            name='remindBefore'
                            render={({ field }) => (
                                <View className='flex-1'>
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                onValueChange={(option) => {
                                                    field.onChange(option?.value);
                                                }}
                                                value={
                                                    field.value ? {
                                                        value: field.value,
                                                        label: field.value
                                                    } : undefined
                                                }
                                                ref={remindBeforeRef}
                                            >
                                                <SelectTrigger
                                                    onLayout={(e) =>
                                                        setTriggerWidth(e.nativeEvent.layout.width)
                                                    }
                                                >
                                                    <SelectValue placeholder="Select a day" />
                                                </SelectTrigger>
                                                <SelectContent
                                                    style={{ width: triggerWidth }}
                                                    className="mt-2">
                                                    <SelectGroup className="">
                                                        <SelectLabel onPress={() => form.reset()}>Days</SelectLabel>
                                                        <SelectSeparator />

                                                        <SelectItem
                                                            value="10"
                                                            label="10 Days"
                                                        />
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </View>
                            )}
                        />
                    </View>

                </View>

                {/* BARCODE FIELD */}
                <FormField
                    control={form.control}
                    name='barcode'
                    render={({ field }) => (
                        <InputField
                            {...field}
                            placeholder='Barcode'
                            returnKeyType='next'
                            onChangeText={field.onChange}
                            value={field.value}
                            ref={barcodeRef}
                        />
                    )}
                />




                {/* EXPIRE_IN FIELD */}
                <FormField
                    control={form.control}
                    name='expireIn'
                    render={({ field }) => (
                        <InputField
                            {...field}
                            placeholder='e.g. 10.10.26'
                            returnKeyType='next'
                            onChangeText={field.onChange}
                            value={field.value}
                            ref={expireInRef}
                        />
                    )}
                />


            </View>
        </Form >
    )
}
