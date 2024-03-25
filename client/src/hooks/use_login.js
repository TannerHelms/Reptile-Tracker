import { useDispatch } from "react-redux";
import useApi from "./use_api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginFn } from "../store/auth_slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

        const { user, token } = await api.post("/sessions", {
            email,
            password,
        });
        if (!user || !token) {
            throw new Error("Invalid email or password");
        }

        return { user, token };
    }

    const { mutateAsync: loginMutation } = useMutation({
        mutationFn: login,
        onSuccess: async ({ user, token }) => {
            console.log('resolved')
            queryClient.setQueryData(["user"], { user });
            queryClient.setQueryData(["token"], token);
            await dispatch(loginFn({ user, token }));
            navigate("/")
            return { user, token }
        },
        onError: (error) => {
            console.error(error);
        }
    });
    return { login: loginMutation };
}

export default useLogin;