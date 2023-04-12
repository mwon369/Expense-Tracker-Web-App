import { useEffect, useState } from "react";
import axios from "axios";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import TransactionDetails from "../components/TransactionDetails";
import TransactionForm from "../components/TransactionForm";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { TRANSACTION_STATE_ACTIONS } from "../context/TransactionContext";

const Home = () => {
  const { state, dispatch } = useTransactionContext();

  const fetchTransactionData = async (uri: string) => {
    await axios
      .get(uri)
      .then((resp) => {
        dispatch({
          type: TRANSACTION_STATE_ACTIONS.GET_ALL,
          payload: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTransactionData(`${import.meta.env.VITE_BASE_URL}/api/transactions/`);
  }, []);

  return (
    <div className="home">
      <div className="transactions">
        {state.transactions.map((t) => (
          <TransactionDetails key={t._id.toString()} {...t} />
        ))}
      </div>
      <TransactionForm />
    </div>
  );
};

export default Home;
