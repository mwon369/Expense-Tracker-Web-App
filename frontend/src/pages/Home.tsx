import { useEffect, useState } from "react";
import axios from "axios";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import TransactionDetails from "../components/TransactionDetails";
import TransactionForm from "../components/TransactionForm";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { STATE_ACTIONS } from "../context/TransactionsContext";

const Home = () => {
  const { state, dispatch } = useTransactionsContext();
  const [numberTotal, setNumberTotal] = useState<number>(0);

  const fetchTransactionData = async (uri: string) => {
    axios
      .get(uri)
      .then((resp) => {
        dispatch({ type: STATE_ACTIONS.GET_ALL, payload: resp.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sumTotal = () => {
    let result = state.transactions.reduce((total, t) => {
      return t.transactionCategory === TransactionCategory.INCOME
        ? total + t.value
        : total - t.value;
    }, 0);
    return result;
  };

  useEffect(() => {
    fetchTransactionData(`${import.meta.env.VITE_BASE_URL}/api/transactions/`);
    setNumberTotal(sumTotal());
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
