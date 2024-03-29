import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./use_api";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";

const useReptiles = () => {
    const api = useApi();
    const token = useSelector(tokenFn)
    const queryClient = useQueryClient();

    const getReptiles = () => api.get("/reptiles");

    const query = {
        queryKey: ["reptiles"],
        queryFn: getReptiles,
        enabled: token.value != null,
    }

    const update = ({ reptile }) => {
        return api.put(`/reptiles/${reptile.id}`, { ...reptile })
    };

    const { mutateAsync: updateReptile } = useMutation({
        mutationFn: update,
        onSuccess: () => queryClient.invalidateQueries(["reptiles"])
    });
    // { reptiles, error }
    const { data: reptiles, error, isLoading } = useQuery(query);

    return { reptiles: reptiles?.reptiles, error, isLoading, updateReptile }
}
export default useReptiles;