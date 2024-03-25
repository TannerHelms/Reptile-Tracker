import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginFn } from "../store/auth_slice";
import useApi from "./use_api";

const useLogin = () => {
    const api = useApi();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
            dispatch(loginFn({ user, token }));
        },
        onError: (error) => {

        }
    });

    return { login: loginMutation, };
}

export default useLogin;