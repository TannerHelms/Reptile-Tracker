import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logout as logoutFn } from "../store/auth_slice";

const useLogout = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const logout = () => {
        dispatch(logoutFn());
        queryClient.setQueryData(["user"], null);
    }
    return { logout }

}

export default useLogout;