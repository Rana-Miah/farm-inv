import { View } from 'react-native'
import React from 'react'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Text } from '../ui/text'
import InputField from '../shared/input-field'
import { employeeCreateFormSchema, EmployeeCreateFormValue } from '@/lib/zod/employee-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'

const EmployeeCreateForm = () => {
    const form = useForm<EmployeeCreateFormValue>({
        defaultValues: {
            employeeTitle: "",
            password: "",
            name: ""
        },
        resolver: zodResolver(employeeCreateFormSchema)
    })


    const onSubmitHandler = form.handleSubmit(values => {
        console.log({ values });

    })




    return (
        <Form {...form}>
            <View className='gap-2 w-72'>
                <View className="gap-1 items-center justify-between flex-row">
                    <FormField
                        control={form.control}
                        name='employeeId'
                        render={({ field }) => (
                            <InputField
                                label='Employee ID'
                                placeholder="e.g. 45168"
                                keyboardType='numeric'
                                returnKeyType="next"
                                onChangeText={field.onChange}
                                value={String(field.value)}
                                className='min-w-36 max-w-36'
                            // onSubmitEditing={handleBarcodeSubmit}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <InputField
                                label='Name'
                                placeholder="e.g. John"
                                returnKeyType="next"
                                onChangeText={field.onChange}
                                value={field.value}
                                className='min-w-36 max-w-36'
                            // onSubmitEditing={handleBarcodeSubmit}
                            />
                        )}
                    />
                </View>
                <FormField
                    control={form.control}
                    name='employeeTitle'
                    render={({ field }) => (
                        <InputField
                            label='Employee Title'
                            placeholder="e.g. I.T"
                            returnKeyType="next"
                            onChangeText={field.onChange}
                            value={field.value}
                        // onSubmitEditing={handleBarcodeSubmit}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <InputField
                            label='Password'
                            placeholder="******"
                            secureTextEntry
                            returnKeyType="next"
                            onChangeText={field.onChange}
                            value={field.value}
                        // onSubmitEditing={handleBarcodeSubmit}
                        />
                    )}
                />
                <Button onPress={onSubmitHandler}>
                    <Text>Create Employee</Text>
                </Button>
            </View>
        </Form>
    )
}

export default EmployeeCreateForm