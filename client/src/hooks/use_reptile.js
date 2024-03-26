import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from './use_api';

const useReptile = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    // { reptile, error }
    const createReptile = (reptile) => api.post("/reptile", { ...reptile });

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
    const deleteReptile = (id) => api.delete(`/reptile/${id}`);

    return { createReptile, getReptile, updateReptile, deleteReptile };
};

export default useReptile;