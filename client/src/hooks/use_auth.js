import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useInit from "./use_init";
import { useSelector } from "react-redux";
import { nav, turnOnNavbar } from "../store/navbar_slice";
import { token as tokenFn } from "../store/token_slice";
const useAuth = () => {
    const navbar = useSelector(nav);
    const token = useSelector(tokenFn)
    const { api, navigate, dispatch } = useInit();

    const getMe = () => api.get("/users/me");
    const query = {
        queryKey: ["user"],
        queryFn: getMe,
        enabled: token.value != null,
        retry: false,
    }

    const { data: user, isLoading, error, isPending } = useQuery(query);

    useEffect(() => {
        if (!isLoading, user) {
            if (!navbar) {
                dispatch(turnOnNavbar());
            }
        }
        if (!isLoading, !user) navigate("/login");
    }, [user, error, isLoading])

    return { user: user?.id ? user : user?.user, isLoading };
}

export default useAuth;
