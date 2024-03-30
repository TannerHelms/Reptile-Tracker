import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useInit from "./use_init";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";

const useCheckAuth = () => {
    const { api, navigate } = useInit();
    const token = useSelector(tokenFn)
    const [isLoading, setIsLoading] = useState(true);

    const getMe = () => api.get("/users/me");

    const { data: user, error, isLoading: load } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        enabled: token.value != null,
    });

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
        if (!load && !user) {
            setIsLoading(false);
        }
    }, [user, error, load])

    return { isLoading };
}

export default useCheckAuth;
