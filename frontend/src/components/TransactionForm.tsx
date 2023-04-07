import React, { FormEvent, useState } from "react";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import axios from "axios";

const TransactionForm = () => {
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState<string | Date>("");
  const [category, setCategory] = useState<TransactionCategory>(
    TransactionCategory.INCOME
  );
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const transaction = {
      value: value,
      date: date,
      transactionCategory: category,
      description: description,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/transactions/`, transaction)
      .then((resp) => {
        if (resp.status === 200) {
          setValue(0);
          setDate("");
          setCategory(TransactionCategory.INCOME);
          setDescription("");
          setError(null);
          console.log(resp.data);
        } else {
          setError(
            "Failed to add new transaction. Please check that you filled out all the fields correctly"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setError(
          "Failed to add new transaction. Please check that you filled out all the fields correctly."
        );
      });
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Transaction</h3>
      <label>Transaction Value: </label>
      <input
        type="number"
        onChange={(e) => setValue(e.target.valueAsNumber)}
        value={value}
      />

      <label>Transaction Date: </label>
      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <label>Transaction Category: </label>
      <select name="selectedCategory" defaultValue="income">
        <option
          value="income"
          onSelect={(e) =>
            setCategory(e.currentTarget.value as TransactionCategory)
          }
        >
          Income
        </option>
        <option
          value="expense"
          onSelect={(e) =>
            setCategory(e.currentTarget.value as TransactionCategory)
          }
        >
          Expense
        </option>
      </select>

      <label>Transaction Description: </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description?.toString()}
      />

      <button>Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TransactionForm;
