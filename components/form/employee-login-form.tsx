import { employeeLoginFormSchema, EmployeeLoginFormValue } from "@/lib/zod/employee-login-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useForm } from "react-hook-form"
import { Form, FormField } from "../ui/form"
import InputField from "../shared/input-field"

export const EmployeeLoginForm = ({ employeeId }: { employeeId: string }) => {
    const router = useRouter()

    const form = useForm<EmployeeLoginFormValue>({
        defaultValues: {
            password: ""
        },
        resolver: zodResolver(employeeLoginFormSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: false
    })

    const onSubmit = form.handleSubmit(values => {
        console.log({ values })
        router.push({
            pathname: '/employee/[empId]',
            params: { empId: employeeId }
        })
    })

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => {

                    return (
                        <InputField
                            {...field}
                            autoFocus
                            value={field.value}
                            placeholder="Password"
                            onSubmitEditing={onSubmit}
                            onChangeText={field.onChange}
                        />
                    )
                }}
            />
        </Form>
    )
}