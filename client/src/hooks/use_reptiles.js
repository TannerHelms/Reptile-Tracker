import { useQuery } from "@tanstack/react-query";
import useApi from "./use_api";

const useReptiles = () => {
    const api = useApi();

    const getReptiles = () => api.get("/reptiles-schedules");

    const query = {
        queryKey: ["reptiles"],
        queryFn: getReptiles,
    }

    // { reptiles, error }
    const { data: reptiles, error, isLoading } = useQuery(query);

    return { reptiles: reptiles?.reptiles, error, isLoading }
}
export default useReptiles;