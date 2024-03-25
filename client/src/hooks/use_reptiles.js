import { useQuery } from "@tanstack/react-query";
import useApi from "./use_api";

const useReptiles = () => {
    const api = useApi();

    const { data: reptiles, error, isLoading } = useQuery({
        queryKey: ["reptiles"],
        queryFn: () => api.get("/reptiles"),
    });

    return { reptiles: reptiles?.reptiles, error, isLoading }
}
export default useReptiles;