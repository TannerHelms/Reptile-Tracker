import { useNavigate } from "react-router-dom";
import useApi from "./use_api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";
import { notifications } from "@mantine/notifications";

const useAuthNavigate = () => {
    const nav = useNavigate();
    const api = useApi();
    const token = useSelector(tokenFn)

    const getMe = async () => (await api.get("/users/me")).user;

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
        enabled: token.value != null,
    })

    const navigate = (path) => {
        if (user?.id) {
            nav(path);
        } else {
            notifications.show({
                title: "You must be logged in to access this page",
                message: "Please log in to access this page",
                color: "red",
            })
            nav("/login");
        }
    }

    return navigate;

}

export default useAuthNavigate;