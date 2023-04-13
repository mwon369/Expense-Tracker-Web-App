import { AUTH_STATE_ACTIONS } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: AUTH_STATE_ACTIONS.LOGOUT, payload: {} });
  };

  return { logout };
};
