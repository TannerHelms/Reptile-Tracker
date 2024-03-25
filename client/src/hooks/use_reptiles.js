import { useQuery } from "@tanstack/react-query";
import useApi from "./use_api";

const useReptiles = () => {
    const api = useApi();

    const getReptiles = async () => {
        const { reptiles, error } = await api.get("/reptiles");
        if (error) {
            throw new Error(error);
        }
        return reptiles;
    }

    const { data: reptiles, error, isLoading } = useQuery({
        queryKey: ["reptiles"],
        queryFn: getReptiles,
    });

    return { reptiles, error, loading: isLoading }
}
export default useReptiles;