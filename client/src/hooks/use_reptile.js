import { useQuery, useMutation, useQueryClient } from 'react-query';
import useApi from './use_api';

const useReptile = () => {
    const api = useApi();

    // { reptile, error }
    const createReptile = (reptile) => api.post("/reptile", { ...reptile });

    // { reptile, error }
    const getReptile = (id) => api.get(`/reptiles/${id}`);

    // { updatedReptile, error }
    const updateReptile = (reptile) => api.put(`/reptile/${reptile.id}`, { ...reptile });

    // { error }
    const deleteReptile = (id) => api.delete(`/reptile/${id}`);

    return { createReptile, getReptile, updateReptile, deleteReptile };
};

export default useReptile;