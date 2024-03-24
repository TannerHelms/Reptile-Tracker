import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../store/auth_slice";
import { store } from "../store/store";
import useApi from "./use_api";
import useSetQuery from "./use_set_query";



const noAuth = ["/login", "signup"]

const useAuth = () => {
    const navigate = useNavigate();
    const api = useApi();
    const { data, isLoading } = useSetQuery({
        queryFn: async () => {
            const token = store.getState().auth.token;
            if (!token) {
                return { user: null, isLoading: false, error: "No Token" }
            }
            const { user } = await api.get("users/me");
            return { user };
        },
        mutateFn: () => { },
        key: "user"
    })

    useEffect(() => {
        if (data?.error) {
            navigate("/login");
        }
    }, [data]);

    if (data?.user) {
        return { user: data.user };
    }
    if (isLoading) return { user: null, loading: true, error: null };

    if (data.user) return { user: data.user, loading: false };


    return { user: null, loading: false, error: "no token" };
}

export default useAuth;
