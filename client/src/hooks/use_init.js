import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApi from "./use_api";

const useInit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const api = useApi();
    return { navigate, dispatch, api };
}

export default useInit;