import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../store/auth_slice";
import { store } from "../store/store";
import useApi from "./use_api";
import useSetQuery from "./use_set_query";



const noAuth = ["/login", "signup"]

const useAuth = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api = useApi();
    const [redirect, setRedirect] = useState(false);
    const { data } = useSetQuery({
        queryFn: async () => {
            const token = store.getState().auth.token;
            // if (!token) return {error: "no token"}
            const { user } = token ? await api.get("users/me") : { user: null };
            console.log(user)
            if (!user) {
                setRedirect(true);
            }
            return user ? { user } : { error: "no user" };
        },
        mutateFn: () => { },
        key: "user"
    })


    useEffect(() => {
        if (redirect && !noAuth.includes(location.pathname)) {
            setRedirect(false);
            navigate("/login");
        }
    }, [redirect, data]);



    if (data?.user) {
        return data.user;
    }

    return null;
}

export default useAuth;
