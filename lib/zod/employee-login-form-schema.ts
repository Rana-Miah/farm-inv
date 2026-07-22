import z from "zod";

export const employeeLoginFormSchema = z.object({
    password: z.string().nonempty({ error: 'Password is Required!' }),
})

export type EmployeeLoginFormValue = z.infer<typeof employeeLoginFormSchema>
