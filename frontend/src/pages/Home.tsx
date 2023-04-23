import { useEffect } from "react";
import axios from "axios";
import TransactionDetails from "../components/TransactionDetails";
import TransactionForm from "../components/TransactionForm";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { TRANSACTION_STATE_ACTIONS } from "../context/TransactionContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { state: transactionState, dispatch } = useTransactionContext();
  const { state: authState } = useAuthContext();

  const fetchTransactionData = (uri: string) => {
    axios
      .get(uri, {
        headers: { Authorization: `Bearer ${authState.user?.token}` },
      })
      .then((resp) => {
        dispatch({
          type: TRANSACTION_STATE_ACTIONS.SET_ALL,
          payload: resp.data,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  useEffect(() => {
    if (authState.user) {
      fetchTransactionData(
        `${import.meta.env.VITE_BASE_URL}/api/transactions/`
      );
    }
  }, [authState.user]);

  return (
    <div className="home">
      <div className="transactions">
        {transactionState.transactions.map((t) => (
          <TransactionDetails key={t._id.toString()} {...t} />
        ))}
      </div>
      <TransactionForm />
    </div>
  );
};

export default Home;
