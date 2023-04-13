import { FormEvent, useState } from "react";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import axios from "axios";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { TRANSACTION_STATE_ACTIONS } from "../context/TransactionContext";
import { roundToTwoDp } from "../utils/HelperFunctions";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionForm = () => {
  const { dispatch } = useTransactionContext();
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<TransactionCategory | "">("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { state: authState } = useAuthContext();

  const hideError = () => {
    setTimeout(() => {
      setError("");
    }, 2500);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authState.user) {
      setError("You are not logged in");
      hideError();
      return;
    }

    const transaction = {
      value: roundToTwoDp(value),
      date: date,
      transactionCategory: category,
      description: description,
    };

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/transactions/`, transaction, {
        headers: { Authorization: `Bearer ${authState.user?.token}` },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setValue(0);
          setDescription("");
          setError("");
          dispatch({
            type: TRANSACTION_STATE_ACTIONS.CREATE_NEW,
            payload: resp.data,
          });
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
        className={!value ? "unfilled" : "filled"}
        onChange={(e) => setValue(e.target.valueAsNumber)}
        value={value === 0 ? "" : value.toString()}
      />

      <label>Transaction Date: </label>
      <input
        type="date"
        className={!date ? "unfilled" : "filled"}
        onChange={(e) => setDate(e.target.valueAsDate)}
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
        className={!description ? "unfilled" : "filled"}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button>Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TransactionForm;
