import { FormEvent, useState } from "react";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import axios from "axios";
import { useTransactionsContext } from "../hooks/useTransactionsContext";
import { STATE_ACTIONS } from "../context/TransactionsContext";

const TransactionForm = () => {
  const { dispatch } = useTransactionsContext();
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);
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
          setDescription("");
          setError(null);
          dispatch({ type: STATE_ACTIONS.CREATE_NEW, payload: resp.data });
        } else {
          setError(
            "Failed to add new transaction. Please check that you filled out all the fields correctly"
          );
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
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
        value={value === 0 ? "" : value}
      />

      <label>Transaction Date: </label>
      <input type="date" onChange={(e) => setDate(e.target.valueAsDate)} />

      <label>Transaction Category: </label>
      <select
        name="selectedCategory"
        defaultValue={TransactionCategory.INCOME}
        onChange={(e) => setCategory(e.target.value as TransactionCategory)}
        value={category}
      >
        <option value={TransactionCategory.INCOME}>Income</option>
        <option value={TransactionCategory.EXPENSE}>Expense</option>
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
