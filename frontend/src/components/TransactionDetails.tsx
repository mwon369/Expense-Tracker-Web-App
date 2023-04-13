import React, { useState } from "react";
import { Transaction } from "../utils/Types";
import { TransactionCategory } from "../../../backend/models/transactionCategory";
import axios from "axios";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { TRANSACTION_STATE_ACTIONS } from "../context/TransactionContext";
import DeletePrompt from "./DeletePrompt";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionDetails = (props: Transaction) => {
  const { value, date, transactionCategory, description } = props;
  const dateParsed = new Date(date);
  const { dispatch } = useTransactionContext();
  const [error, setError] = useState<string>("");
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const { state: authState } = useAuthContext();

  const hideError = () => {
    setTimeout(() => {
      setError("");
    }, 2500);
  };

  const handlePromptShow = () => setShowDeletePrompt(!showDeletePrompt);

  const handleDelete = async () => {
    if (!authState.user) {
      setError("You are not logged in");
      hideError();
      return;
    }

    const id = props._id;
    await axios
      .delete(`${import.meta.env.VITE_BASE_URL}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${authState.user?.token}` },
      })
      .then((resp) => {
        dispatch({
          type: TRANSACTION_STATE_ACTIONS.DELETE_BY_ID,
          payload: resp.data,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError("Delete failed. Try again later.");
        hideError();
      });
    handlePromptShow();
  };

  return (
    <div className="transaction-details">
      <h4
        className={
          transactionCategory === TransactionCategory.INCOME
            ? "income"
            : "expense"
        }
      >{`$${value} (${transactionCategory})`}</h4>
      <p>
        <strong>Date: &nbsp; </strong>
        {dateParsed.toDateString()}
      </p>
      <p>
        <strong>Description: &nbsp; </strong>
        {description}
      </p>
      <span onClick={handlePromptShow} className="material-symbols-outlined">
        Delete
      </span>
      {showDeletePrompt && (
        <DeletePrompt
          handlePromptShow={handlePromptShow}
          handleDelete={handleDelete}
        />
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TransactionDetails;
