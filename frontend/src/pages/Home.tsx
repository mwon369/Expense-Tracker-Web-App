import React, { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "../utils/Types";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import TransactionDetails from "../components/TransactionDetails";

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [numberTotal, setNumberTotal] = useState<number>(0);

  const fetchTransactionData = (uri: string) => {
    axios
      .get(uri)
      .then((resp) => {
        setTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sumTotal = () => {
    let result = transactions.reduce((total, t) => {
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
        {transactions.length > 0 &&
          transactions.map((t) => (
            <TransactionDetails key={t._id.toString()} {...t} />
          ))}
      </div>
    </div>
  );
};

export default Home;
