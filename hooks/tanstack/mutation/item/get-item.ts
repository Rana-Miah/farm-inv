import { MUTATION_KEY } from "@/constants/tanstack-query"
import { getItemByBarcode } from "@/dal/item/get-item"
import { useMutation } from "@tanstack/react-query"

export const useGetItemByBarcode = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.ITEM.READ],
        mutationFn: (barcode: string) => getItemByBarcode(barcode),
    })
}
