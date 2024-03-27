import useApi from './use_api';



const useFeeding = () => {
    const api = useApi();

    // { feeding, error }
    const createFeeding = async (id, foodItem) => api.post("/feedings", { id, foodItem })

    // { feedings: [], error }
    const getFeedingsByReptile = async (id) => api.get(`/feedings/reptile/${id}`)

    // { feeding: {}, error }
    const getFeedingById = async (id) => api.get(`/feedings/${id}`)

    // { updatedFeeding, error }
    const updateFeeding = async (id, retpileId, foodItem) => api.put(`/feedings/${id}`, { retpileId, foodItem })

    // { error }
    const deleteFeeding = async (feedingId) => api.delete(`/feedings/${feedingId}`)

    return { createFeeding, getFeedingsByReptile, getFeedingById, updateFeeding, deleteFeeding };
};

export default useFeeding;