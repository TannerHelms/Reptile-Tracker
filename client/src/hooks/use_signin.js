import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Api from "../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../store/auth_slice";


const signIn = async ({ email, password }) => {
    const { user, token } = await Api.post("/sessions", {
        email,
        password,
    });
    if (user && token) {
        return { user, token };
    } else {
        throw new Error("Username or Password is incorrect");
    }
}

const useSignIn = () => {
    const queryclient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mutate: SignInMutation, error, status } = useMutation({
        mutationFn: signIn,
        onSuccess: ({ user, token }) => {
            dispatch(login({ user, token }));
            queryclient.setQueryData("user", user);
            navigate("/");
        },

    })
    return { SignInMutation, error };
}

export default useSignIn;