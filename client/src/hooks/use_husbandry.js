import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { token as tokenFn } from '../store/token_slice';
import useApi from './use_api';
import { useLocation } from "react-router-dom"
const useHusbandry = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tokenFn)

    // CRUD Functionality for a reptile


    const update = (reptile) => api.put(`/reptiles/${reptile.id}/husbandry`, reptile)

    const create = (reptileId, husbandry) => {
        api.post(`/reptiles/${reptileId}/husbandry`, husbandry)
        console.log(husbandry)
    }

    const del = (reptileId) => api.del(`/reptiles/${reptileId}`)

    // Update a reptile
    const { mutateAsync: updateReptile } = useMutation({
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

    // Create a reptile
    const { mutateAsync: createHusbandry } = useMutation({
        mutationFn: create,
    });

    // Delete a reptile
    const { mutateAsync: deleteReptile } = useMutation({
        mutationFn: del,
        onSuccess: () => {
            queryClient.invalidateQueries(["reptiles"]);
            queryClient.removeQueries(["reptile"]);
        },
    });

    return { updateReptile, deleteReptile, createHusbandry };

};

export default useHusbandry;