import { inventoryDb } from "@/drizzle/db/inventory-db"
import { employeeTable } from "@/drizzle/schema/inventory"
import { EmployeeCreateFormValue } from "@/lib/zod/employee-form-schema"
import { eq } from "drizzle-orm"

export const createEmployee = async (value: EmployeeCreateFormValue) => {
    try {
        const allEmployees = await inventoryDb.select().from(employeeTable)
        if (allEmployees.length < 1 && value.employeeTitle !== 'EDP') return

        const EdpEmployee = await inventoryDb.select().from(employeeTable).where(eq(employeeTable.employeeTitle, 'EDP'))

    } catch (error) {

    }
}