import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store/token_slice";
import useApi from "./use_api";


const useLogin = () => {
    const api = useApi();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const user = queryClient.getQueryData(["user"]);

    useEffect(() => {
        if (user) navigate("/");
    }, [user])

    const { mutateAsync: loginMutation, error } = useMutation({
        mutationFn: ({ email, password }) => api.post("/sessions", { email, password }),
        onSuccess: async ({ user, token }) => {
            queryClient.setQueryData(["user"], user);
            dispatch(setToken({ token }))
        },
    });

    return { login: loginMutation, error };
}

export default useLogin;