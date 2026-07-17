import { getItemByBarcode } from "@/dal/item/get-item"
import { AddItemFormValue } from "@/lib/zod/add-item-form-schema"
import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { useGetItemByBarcode } from "./tanstack/mutation/item/get-item"

export function useDefaultUnitFromItemDetails(
    form: UseFormReturn<AddItemFormValue>,
    itemDetails: Awaited<ReturnType<typeof getItemByBarcode>>['data'] | undefined
) {
    const { setValue } = form

    useEffect(() => {

        if (itemDetails?.item) {
            setValue("uom", `${itemDetails?.item.uom}|${itemDetails?.item.packing}`, {
                shouldValidate: true,
                shouldDirty: true,
            })
        }

        if (!itemDetails?.orderItem) return
        setValue('uom', `${itemDetails?.orderItem.uom}|${itemDetails?.orderItem.packing}`, {
            shouldValidate: true,
            shouldDirty: true,
        })


    }, [itemDetails, setValue])
}
