import { TransactionContext } from "../context/TransactionsContext";
import { useContext } from "react";

export const useTransactionsContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw Error(
      "useTransactionsContext must be used inside TransactionsContextProvider"
    );
  }
  return context;
};
