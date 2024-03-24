import { useQuery } from "@tanstack/react-query"
import Api from "../utils/api"
import { useDispatch } from "react-redux";
import { logout } from "../store/auth_slice";

const getUser = async () => {
    const { user, error } = await Api.get("/users/me");
    if (user) return user;
    throw new Error("No user found")
}

const useUser = () => {
    const dispatch = useDispatch();
    const { data: user, error, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        onError: (error) => {
            dispatch(logout())
        }

    })

    return { user, error, loading: isLoading }
}

export default useUser;