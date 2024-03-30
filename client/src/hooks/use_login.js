import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { setToken } from "../store/token_slice";
import useInit from "./use_init";
import { useNavigate } from "react-router-dom";
import { turnOnNavbar } from "../store/navbar_slice";


const useLogin = () => {
    const { api, dispatch } = useInit();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const login = ({ email, password }) => {
        return api.post("/sessions", { email, password })
    };

    const { mutateAsync: loginMutation, error } = useMutation({
        queryKey: ["user"],
        mutationFn: login,
        onSuccess: ({ user, token }) => {
            navigate("/");
            queryClient.setQueryData("user", user);
            dispatch(setToken({ token }))
            dispatch(turnOnNavbar())
        },
    });

    return { login: loginMutation, error };
}

export default useLogin;