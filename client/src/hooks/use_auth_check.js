import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";

const useCheckAuth = () => {
    const { api, navigate, dispatch } = useInit();
    const [isLoading, setIsLoading] = useState(true);
    const getMe = () => api.get("/users/me");

    const query = {
        queryKey: ["user"],
        queryFn: getMe,
    }

    const { data: user, error } = useQuery(query);

    useEffect(() => {
        if (user) {
            dispatch(turnOnNavbar());
            navigate("/")
        }
        if (error) {
            setIsLoading(false);
        }
    }, [user, error])

    return { isLoading };
}

export default useCheckAuth;
