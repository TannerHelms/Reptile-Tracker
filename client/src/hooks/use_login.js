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
        if (user?.user) navigate("/");
    }, [user])

    const login = async ({ email, password }) => {
        const { user, token } = await api.post("/sessions", { email, password });
        if (!user || !token) throw new Error("Invalid email or password");
        return { user, token };
    }

    const { mutateAsync: loginMutation } = useMutation({
        mutationFn: login,
        onSuccess: async ({ user, token }) => {
            queryClient.setQueryData(["user"], { user });
            dispatch(setToken({ token }))
        },
        onError: (error) => {

        }
    });

    return { login: loginMutation, };
}

export default useLogin;