import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { token as tokenFn } from '../store/token_slice';
import useApi from './use_api';
import { useLocation } from "react-router-dom"
const useReptile = (id) => {
    const location = useLocation();
    const repId = location.pathname.split("/")[2]
    if (repId) {
        id = repId
    }
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tokenFn)

    // CRUD Functionality for a reptile
    const get = async () => {
        const { reptile } = await api.get(`/reptiles/${id}`)
        return reptile
    }

    const update = (reptile) => api.put(`/reptiles/${reptile.id || id}`, reptile)

    const del = (reptileId) => api.del(`/reptiles/${reptileId || id}`)


    // Get a reptile
    const reptile = useQuery({
        queryKey: ["reptile", parseInt(id)],
        queryFn: get,
        enabled: id != "null" && id != undefined && token.value != null,
    })

    // Update a reptile
    const updateReptile = useMutation({
        mutationFn: update,
        onMutate: (reptile) => {
            queryClient.setQueryData(["reptile", reptile.id], { reptile })
            queryClient.setQueryData(["reptiles"], (old) => {
                return old?.map((r) => r.id == reptile.id ? reptile : r)
            })
        },
        onSettled: () => {
            // queryClient.invalidateQueries(["reptile", id])
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

    return { reptile, updateReptile, deleteReptile };

};

export default useReptile;