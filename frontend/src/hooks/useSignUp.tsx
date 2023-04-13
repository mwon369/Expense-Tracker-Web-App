import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { AUTH_STATE_ACTIONS } from "../context/AuthContext";

export const useSignUp = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state, dispatch } = useAuthContext();

  const hideError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const signUp = async (
    username: string,
    password: string,
    confirmedPassword: string
  ) => {
    setIsLoading(true);
    setError("");

    if (password !== confirmedPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      hideError();
      return;
    }

    const newUser = {
      username: username,
      password: password,
    };

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, newUser)
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

  return { signUp, isLoading, error };
};
