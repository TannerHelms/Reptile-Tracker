import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";

const useCheckAuth = () => {
    const { api, navigate, dispatch } = useInit();
    const [isLoading, setIsLoading] = useState(true);

    const getMe = () => api.get("/users/me");

    const { data: user, error } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
    });

    useEffect(() => {
        if (user) {
            navigate("/")
            dispatch(turnOnNavbar());
        }
        if (error) {
            setIsLoading(false);
        }
    }, [user, error])

    return { isLoading };
}

export default useCheckAuth;
