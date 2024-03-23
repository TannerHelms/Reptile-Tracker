import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSetQuery = ({ queryFn, mutateFn, key }) => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryFn: queryFn,
        queryKey: [key],
    });

    const { mutateAsync: mutate } = useMutation({
        mutationFn: mutateFn,
        onSuccess: () => {
            queryClient.invalidateQueries(key);
        },
    });

    return { data, mutate }
}

export default useSetQuery;