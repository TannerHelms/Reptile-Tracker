import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../store/auth_slice";
import { store } from "../store/store";
import useApi from "./use_api";
import useSetQuery from "./use_set_query";
import useUser from "./use_user";


const useAuth = () => {
    const { user, error, loading } = useUser();
    const navigate = useNavigate();
    console.log(error)
    if (loading) return { user: null, loading: true, error: null };

    if (error) {
        navigate("/login");
        return { user: null, loading: false, error: error };
    };

    return { user, loading: false, error: null }
}

export default useAuth;
