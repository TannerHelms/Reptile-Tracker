import useApi from "./use_api"
import useAuth from "./use_auth";

const useReptile = () => {
    const api = useApi();
    const user = useAuth(false);

    const getReptiles = async () => {
        if (!user) return null;
        return (await api.get("reptiles")).reptiles || null;
    }
    return { getReptiles };
}

export default useReptile;