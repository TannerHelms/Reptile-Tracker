import useApi from './use_api';
const useHusbandry = () => {
    const api = useApi();

    // CRUD Functionality for a reptile

    const updateHusbandry = (husbandry) => api.put(`/reptiles/${husbandry.reptileId}/husbandry/${husbandry.recordId}`, husbandry)

    const createHusbandry = (husbandry) => {
        const res = api.post(`/reptiles/${husbandry.reptileId}/husbandry`, husbandry)
        return res;
    }

    const deleteHusbandry = (husbandry) => api.del(`/reptiles/${husbandry.reptileId}/husbandry/${husbandry.recordId}`)

    return { updateHusbandry, createHusbandry, deleteHusbandry };

};

export default useHusbandry;