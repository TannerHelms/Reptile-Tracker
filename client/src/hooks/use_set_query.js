import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useSetQuery = ({ queryFn, mutateFn, key }) => {
    const queryClient = useQueryClient();
    const { data, isLoading, isSuccess, status } = useQuery({
        queryFn: queryFn,
        queryKey: [key],
    });

    const { mutateAsync: mutate } = useMutation({
        mutationFn: mutateFn,
        onSuccess: () => {
            queryClient.invalidateQueries(key);
        },
    });

    return { data, isLoading, mutate, isSuccess, status }
}

export default useSetQuery;