import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./use_api";

const useSchedules = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    const getSchedules = () => api.get("/reptiles-schedules");

    const update = (schedule) => api.put(`/schedules/schedule/${schedule.id}`, { ...schedule });

    const del = async ({ reptileId, id }) => {
        console.log(reptileId, id)
        const resp = await api.del(`schedules/schedule/${id}`)
        const { reptile } = await api.get(`/reptiles/${reptileId}`);
        queryClient.setQueryData(["reptile"], reptile);
        console.log(reptile)
        return reptile;
    };

    const query = {
        queryKey: ["schedules"],
        queryFn: getSchedules,
    }

    const { mutateAsync: updateSchedule } = useMutation({
        mutationFn: update,
        onSettled: () => queryClient.invalidateQueries(["schedules"])
    });

    const { mutateAsync: deleteSchedule } = useMutation({
        mutationFn: del,
        onSuccess: async () => {
            queryClient.invalidateQueries(["schedules", "reptiles"])
        }
    })

    // { reptiles, error }
    const { data: schedules, error, isLoading } = useQuery(query);

    return { schedules: schedules?.reptilesWithSchedules, error, isLoading, updateSchedule, deleteSchedule }
}
export default useSchedules;