import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";

const useAuth = () => {
    const { api, navigate, dispatch } = useInit();

    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => api.get("/users/me"),
    });

    useEffect(() => {
        if (error) navigate("/login");
        if (user) dispatch(turnOnNavbar())
    }, [user, error])

    return { user, isLoading };
}

export default useAuth;
