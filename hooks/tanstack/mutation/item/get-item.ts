import { MUTATION_KEY } from "@/constants/tanstack-query"
import { getItemByBarcode, getItemPriceCheckByBarcode, getScannedItems, getSearchItems } from "@/dal/item/get-item"
import { AddItemFormValue } from "@/lib/zod/add-item-form-schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetItemByBarcode = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.ITEM.READ],
        mutationFn: (payload: Pick<AddItemFormValue, 'scanType' | 'isAdvanceMode' | 'barcode'>) => getItemByBarcode(payload),
    })
}

export const useCheckItemPrice = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.ITEM.READ],
        mutationFn: (barcode: string) => getItemPriceCheckByBarcode(barcode),
    })
}

export const useGetScannedItems = () => useQuery({
    queryKey: [MUTATION_KEY.SCANNED_ITEM.READ],
    queryFn: getScannedItems,
    networkMode: 'offlineFirst'
})


export const useGetStoredScannedItemsSearch = (search: string) => {
    const queryKey = [MUTATION_KEY.SCANNED_ITEM.READ, search];
    return useQuery({
        queryKey,
        queryFn: () => getSearchItems(search),
        enabled: search.length > 0,
    });
};