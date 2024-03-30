import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./use_api";

const useFoodItem = (reptileId) => {
    const queryClient = useQueryClient();
    const api = useApi();
    const { mutateAsync: createFoodItem } = useMutation({
        mutationFn: (foodItem) => api.post(`/feeding`, { reptileId, foodItem }),
        onSettled: () => queryClient.invalidateQueries(["reptile", reptileId])
    });

    const { mutateAsync: deleteFoodItem } = useMutation({
        mutationFn: (foodItemId) => api.del(`/feeding/${foodItemId}`),
        onSettled: () => queryClient.invalidateQueries(["reptile", reptileId])
    });

    return { createFoodItem, deleteFoodItem }

}
export default useFoodItem;