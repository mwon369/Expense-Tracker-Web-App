import React, { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "../utils/Types";

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/transactions/`)
      .then((resp) => {
        setTransactions(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home">
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((t) => (
            <p key={t._id.toString()}>{t.value.toString()}</p>
          ))}
      </div>
    </div>
  );
};

export default Home;
