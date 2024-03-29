import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useApi from './use_api';
import { boolean } from 'zod';
import { useSelector } from 'react-redux';
import { token as tokenFn } from '../store/token_slice';

const useReptile = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tokenFn)

    const get = () => api.get(`/reptiles/${id}`)

    const { data: reptile, isLoading, error, status } = useQuery({
        queryKey: ["reptile", parseInt(id)],
        queryFn: get,
        enabled: id != "null" && id != undefined && token.value != null,
    })

    const update = (updatedReptile) => api.put(`/reptiles/${id}`, updatedReptile)

    const updateReptile = useMutation({
        mutationFn: update,
        onSuccess: () => {
            queryClient.invalidateQueries(["reptile", id])
        },
    })

    const del = (reptileId) => {
        return api.del(`/reptiles/${reptileId || id}`)
    }

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