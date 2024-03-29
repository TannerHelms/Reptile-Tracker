import { useQuery } from "@tanstack/react-query";
import useApi from "./use_api";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";

const useReptiles = () => {
    const api = useApi();
    const token = useSelector(tokenFn)

    const getReptiles = () => api.get("/reptiles");

    const query = {
        queryKey: ["reptiles"],
        queryFn: getReptiles,
        enabled: token.value != null,
    }

    // { reptiles, error }
    const { data: reptiles, error, isLoading } = useQuery(query);

    return { reptiles: reptiles?.reptiles, error, isLoading }
}
export default useReptiles;