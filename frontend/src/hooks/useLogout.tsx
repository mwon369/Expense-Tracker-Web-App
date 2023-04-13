import { AUTH_STATE_ACTIONS } from "../context/AuthContext";
import { TRANSACTION_STATE_ACTIONS } from "../context/TransactionContext";
import { useAuthContext } from "./useAuthContext";
import { useTransactionContext } from "./useTransactionContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: transactionDispatch } = useTransactionContext();

  const logout = () => {
    localStorage.removeItem("user");
    authDispatch({
      type: AUTH_STATE_ACTIONS.LOGOUT,
      payload: { username: "", token: "" },
    });
    transactionDispatch({
      type: TRANSACTION_STATE_ACTIONS.SET_ALL,
      payload: [],
    });
  };

  return { logout };
};
