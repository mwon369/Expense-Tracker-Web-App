import { FormEvent, useState } from "react";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import axios from "axios";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { STATE_ACTIONS } from "../context/TransactionContext";
import { roundToTwoDp } from "../utils/HelperFunctions";

const TransactionForm = () => {
  const { dispatch } = useTransactionContext();
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<TransactionCategory | "">("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const hideError = () => {
    setTimeout(() => {
      setError("");
    }, 2500);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const transaction = {
      value: roundToTwoDp(value),
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
          setError("");
          dispatch({ type: STATE_ACTIONS.CREATE_NEW, payload: resp.data });
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError("Please fill out all the fields.");
        hideError();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Transaction</h3>
      <label>Transaction Value: </label>
      <input
        type="number"
        onChange={(e) => setValue(e.target.valueAsNumber)}
        value={value === 0 ? "" : value.toString()}
        className={!value ? "unfilled" : "filled"}
      />

      <label>Transaction Date: </label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.valueAsDate)}
        className={!date ? "unfilled" : "filled"}
      />

      <label>Transaction Category: </label>
      <select
        name="selectedCategory"
        onChange={(e) => setCategory(e.target.value as TransactionCategory)}
        value={category}
        className={!category ? "unfilled" : "filled"}
      >
        <option value={""}>----</option>
        <option value={TransactionCategory.INCOME}>Income</option>
        <option value={TransactionCategory.EXPENSE}>Expense</option>
      </select>

      <label>Transaction Description: </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={!description ? "unfilled" : "filled"}
      />

      <button>Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TransactionForm;
