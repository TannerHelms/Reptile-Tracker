import useApi from "./use_api";

const useSchedule = () => {
    const api = useApi();

    const create = (schedule) => api.post("/schedules", { ...schedule });

}

export default useSchedule;