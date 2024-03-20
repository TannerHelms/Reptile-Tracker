import { useContext } from "react";
import { UserContext } from "../utils/user";

const useCurrentUser = () => {
    return useContext(UserContext)
}

export default useCurrentUser;