import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./use_api";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";

const useSchedules = () => {
    const api = useApi();
    const token = useSelector(tokenFn)
    const queryClient = useQueryClient();
    const getSchedules = () => api.get("/reptiles-schedules");

    const update = (schedule) => api.put(`/schedules/schedule/${schedule.id}`, { ...schedule });

    const del = async ({ reptileId, id }) => api.del(`schedules/schedule/${id}`)

    const { mutateAsync: deleteSchedule, variables } = useMutation({
        mutationFn: del,
        onSettled: () => {
            queryClient.invalidateQueries(["reptile", variables.reptileId])
        }
    })

    const create = (schedule) => api.post(`/schedules/${schedule.reptileId}`, { ...schedule });

    const query = {
        isFetchingOptimistic: true,
        queryKey: ["schedules"],
        queryFn: getSchedules,
        enabled: token.value != null,
    }

    const { mutateAsync: updateSchedule } = useMutation({
        mutationFn: update,
        onSettled: () => queryClient.invalidateQueries(["schedules"])
    });



    const { mutateAsync: createSchedule, error: createError } = useMutation({
        mutationFn: create,
        onSuccess: async () => {
            queryClient.invalidateQueries(["schedules", "reptiles"])
        }
    })

    // { reptiles, error }
    const { data: schedules, error, isLoading } = useQuery(query);

    return { schedules: schedules?.reptilesWithSchedules, error, isLoading, updateSchedule, deleteSchedule, createSchedule, createError }
}
export default useSchedules;