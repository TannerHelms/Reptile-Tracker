import { useEffect, useState } from "react";
import useApi from "./use_api";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "./use_User";

const useAuth = () => {
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const userContext = useCurrentUser();

    const api = useApi();

    useEffect(() => {
        const get = async () => {
            const resp = await api.get("/users/me");
            if (resp.user) {
                setUser(resp.user);
                userContext.updateUser(resp.user);
            } else {
                navigate("/login")
            }
        }
        get();
    }, []);
    return user;
}

export default useAuth;
