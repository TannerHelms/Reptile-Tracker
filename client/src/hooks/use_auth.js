import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { turnOnNavbar } from "../store/navbar_slice";
import useApi from "./use_api";

const useAuth = () => {
    const navigate = useNavigate();
    const api = useApi();
    const dispatch = useDispatch();

    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => api.get("/users/me"),
    });


    useEffect(() => {
        if (user == null && error) navigate("/login");
        if (user) dispatch(turnOnNavbar())
    }, [user, error])

    return { user, isLoading };
}

export default useAuth;
