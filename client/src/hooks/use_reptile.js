import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useApi from './use_api';
import { boolean } from 'zod';
import { useSelector } from 'react-redux';
import { token as tokenFn } from '../store/token_slice';

const useReptile = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tokenFn)

    // CRUD Functionality for a reptile
    const get = () => api.get(`/reptiles/${id}`)

    const update = (reptile) => api.put(`/reptiles/${reptile.id || id}`, reptile)

    const del = (reptileId) => api.del(`/reptiles/${reptileId || id}`)


    // Get a reptile
    const { data: reptile, isLoading, error, status } = useQuery({
        queryKey: ["reptile", parseInt(id)],
        queryFn: get,
        enabled: id != "null" && id != undefined && token.value != null,
    })

    // Update a reptile
    const updateReptile = useMutation({
        mutationFn: update,
        onMutate: (reptile) => {
            queryClient.setQueryData(["reptile", reptile.id], { reptile })
        },
        onSettled: () => {
            queryClient.invalidateQueries(["reptile", id])
        },
    })

    // Delete a reptile
    const { mutateAsync: deleteReptile } = useMutation({
        mutationFn: del,
        onSuccess: () => {
            queryClient.invalidateQueries(["reptiles"]);
            queryClient.removeQueries(["reptile", id]);
        },
    });

    return { reptile: reptile?.reptile, isLoading, error, updateReptile, status, deleteReptile };

};

export default useReptile;