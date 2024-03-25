import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { setToken } from "../store/token_slice";
import useInit from "./use_init";


const useLogin = () => {
    const { api, dispatch, navigate } = useInit();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData("user");

    useEffect(() => {
        if (user) navigate("/");
    }, [user])

    const login = ({ email, password }) => {
        console.log(email, password);
        return api.post("/sessions", { email, password })
    };

    const mutate = {
        queryKey: ["user"],
        mutationFn: login,
        onSuccess: ({ user, token }) => {
            queryClient.setQueryData("user", user);
            dispatch(setToken({ token }))
        },
    }

    const { mutateAsync: loginMutation, error } = useMutation(mutate);

    return { login: loginMutation, error };
}

export default useLogin;