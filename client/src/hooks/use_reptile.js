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

    const create = (reptile) => api.post(`/reptiles`, reptile)

    const del = (reptileId) => api.del(`/reptiles/${reptileId || id}`)


    // Get a reptile
    const reptile = useQuery({
        queryKey: ["reptile", parseInt(id)],
        queryFn: get,
        enabled: id != "null" && id != undefined && token.value != null,
    })

    // Update a reptile
    const { mutateAsync: updateReptile } = useMutation({
        mutationFn: update,
        onSettled: () => {
            queryClient.invalidateQueries(["reptile", id])
        },
    })

    // Create a reptile
    const { mutateAsync: createReptile } = useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries(["reptiles"]);
        },
    });

    // Delete a reptile
    const { mutateAsync: deleteReptile } = useMutation({
        mutationFn: del,
        onSuccess: () => {
            queryClient.invalidateQueries(["reptiles"]);
            queryClient.removeQueries(["reptile", id]);
        },
    });

    return { reptile, updateReptile, deleteReptile, createReptile };

};

export default useReptile;