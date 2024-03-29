import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";
import useApi from "./use_api";

const useReptiles = () => {
    const api = useApi();
    const token = useSelector(tokenFn)
    const queryClient = useQueryClient();

    const getReptiles = async () => {
        const { reptiles } = await api.get("/reptiles")
        return reptiles
    };

    // { reptiles, error }
    const reptiles = useQuery({
        queryKey: ["reptiles"],
        queryFn: getReptiles,
        enabled: token.value != null,
        select: (data) => {
            data.map((r) => {
                queryClient.setQueryData(["reptile", r.id], r)
            })
            return data
        }

    });

    return reptiles;
}
export default useReptiles;