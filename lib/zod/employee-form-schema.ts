import z from "zod";

export const employeeCreateFormSchema = z.object({
    name: z.string(),
    employeeId: z.coerce.number<number>(),
    employeeTitle: z.string(),
    password: z.string(),
})

export type EmployeeCreateFormValue = z.infer<typeof employeeCreateFormSchema>