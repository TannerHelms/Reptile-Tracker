import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "./use_api";

const useAuth = () => {
    const navigate = useNavigate();
    const api = useApi();
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => api.get("/users/me"),
        throwOnError: true,
    });

    useEffect(() => {
        if (data?.error) {
            navigate("/login")
        }
        if (data?.user == null && !isLoading) {
            navigate("/login")
        }
    }, [data])

    if (isLoading) return { user: null, loading: isLoading };

    if (data?.user) return { user: data.user, loading: isLoading };

    return { user: null, loading: isLoading };
}

export default useAuth;
