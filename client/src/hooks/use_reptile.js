import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from './use_api';

const useReptile = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    // { reptile, error }
    const create = (reptile) => api.post("/reptiles", { ...reptile });
    const createReptile = useMutation({
        mutationFn: create,
        onSuccess: ({ reptile }) => {
            queryClient.invalidateQueries(["reptiles"]);
            queryClient.setQueryData(["reptile"], reptile);
        }

    })

    // { reptile, error }
    const getReptile = (id) => api.get(`/reptiles/${id}`);

    // { updatedReptile, error }
    const update = (reptile) => api.put(`/reptiles/${reptile.id}`, { ...reptile });

    const updateReptile = useMutation({
        mutationFn: update,
        onSuccess: ({ updatedReptile }) => {
            queryClient.invalidateQueries(["reptiles"]);
            queryClient.setQueryData(["reptile"], updatedReptile);
        }
    });

    // { error }
    const del = (id) => api.del(`/reptiles/${id}`);
    const deleteReptile = useMutation({
        mutationFn: del,
        onSuccess: () => {
            queryClient.invalidateQueries(["reptiles"]);
        }

    })

    return { createReptile, getReptile, updateReptile, deleteReptile };
};

export default useReptile;