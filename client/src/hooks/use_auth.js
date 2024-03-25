import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "./use_api";
import { useDispatch } from "react-redux";
import { turnOnNavbar } from "../store/navbar_slice";

const useAuth = () => {
    const navigate = useNavigate();
    const api = useApi();
    const dispatch = useDispatch();
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => api.get("/users/me"),
        onSuccess: () => console.log("success"),
        throwOnError: true,
    });


    useEffect(() => {
        if (data?.error || (data?.user == null && !isLoading)) {
            navigate("/login");
        }
        if (data?.user) {
            dispatch(turnOnNavbar())
        }
    }, [data])

    if (isLoading) return { user: null, loading: isLoading };

    if (data?.user) return { user: data.user, loading: isLoading };

    return { user: null, loading: isLoading };
}

export default useAuth;
