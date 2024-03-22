import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth } from "../store/auth_slice";
import { useEffect } from "react";

// return {user, token}
const useAuth = (requireAuth = true) => {
    const auth = useSelector(Auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (requireAuth && !auth?.user) {
            navigate("/login");
        }
    }, [])

    return auth;

}

export default useAuth;
