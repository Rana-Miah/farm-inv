import { farmDb } from "@/drizzle/db/farm-db"
import { itemMasterTable } from "@/drizzle/schema/farm-schema"
import { failureResponse, successResponse } from "@/lib/response"
import { eq } from "drizzle-orm"

export const getItemByBarcode = async (barcode: string) => {
    try {
        if (!barcode) return failureResponse('Barcode is missing!')
        const [item] = await farmDb.select().from(itemMasterTable).where(
            eq(itemMasterTable.barcode, barcode)
        )

        if (!item) return failureResponse('Item not found!')

        return successResponse(item)

    } catch (error) {
        console.log('error', error)
        return failureResponse('Failed to get item!')
    }
}
