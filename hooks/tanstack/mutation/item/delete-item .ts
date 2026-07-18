import { MUTATION_KEY } from "@/constants/tanstack-query";
import { deleteOrderItemsByBarcode } from "@/dal/item/delete-items";
import { useMutation } from "@tanstack/react-query";

export const useDeleteOrderItem = () => useMutation({
    mutationKey: [MUTATION_KEY.SCANNED_ITEM.UPDATE],
    mutationFn: (id: string) => deleteOrderItemsByBarcode(id)
})