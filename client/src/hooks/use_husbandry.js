import useApi from './use_api';
const useHusbandry = () => {
    const api = useApi();

    // CRUD Functionality for a reptile

    const update = (reptile) => api.put(`/reptiles/${reptile.id}/husbandry`, reptile)

    const createHusbandry = (reptileId, husbandry) => {
        const res = api.post(`/reptiles/${reptileId}/husbandry`, husbandry)
        return res;
    }

    const del = (reptileId) => api.del(`/reptiles/${reptileId}`)

    return { createHusbandry };

};

export default useHusbandry;