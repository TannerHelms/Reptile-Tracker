import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";

const useAuth = () => {
    const { api, navigate, dispatch } = useInit();

    const getMe = () => api.get("/users/me");

    const query = {
        queryKey: ["user"],
        queryFn: getMe,
    }

    const { data: user, isLoading, error } = useQuery(query);

    useEffect(() => {
        if (error) navigate("/login");
        if (user) dispatch(turnOnNavbar())
    }, [user, error])

    return { user: user?.id ? user : user?.user, isLoading };
}

export default useAuth;
