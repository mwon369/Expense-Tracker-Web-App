import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { AUTH_STATE_ACTIONS } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const hideError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError("");

    const user = {
      username: username,
      password: password,
    };

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, user)
      .then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("user", JSON.stringify(resp.data));
          dispatch({ type: AUTH_STATE_ACTIONS.LOGIN, payload: resp.data });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(`${error.response.data.error}`);
        setIsLoading(false);
        hideError();
      });
  };

  return { login, isLoading, error };
};
