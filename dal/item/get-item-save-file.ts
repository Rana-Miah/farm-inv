import { inventoryDb } from "@/drizzle/db/inventory-db"
import { inventoryTable } from "@/drizzle/schema/inventory"
import { failureResponse, successResponse } from "@/lib/response"
import { desc, sql } from "drizzle-orm"

export const getSavedItems = async () => {
    try {
        const scannedItems = await inventoryDb.select().from(inventoryTable).orderBy(desc(inventoryTable.createdAt))
        const scannedItemsCount = await inventoryDb.select({ scanFlag: inventoryTable.scanFlag, count: sql<number>`cast(count(*) as int)` }).from(inventoryTable).groupBy(inventoryTable.scanFlag)

        return successResponse({
            scannedItems,
            scannedItemsCount
        })

    } catch (error) {
        console.log(error)
        return failureResponse('Failed to get scanned items')
    }
}