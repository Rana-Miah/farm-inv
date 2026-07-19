import { queryClient } from "@/components/provider/tanstack-query-client"
import { MUTATION_KEY } from "@/constants/tanstack-query"

export const invalidateLabelingGetQuery = async () => {
    await queryClient.invalidateQueries({
        queryKey: [MUTATION_KEY.LABELING.READ]
    })
}