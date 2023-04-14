import React from "react";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { roundToTwoDp } from "../utils/HelperFunctions";

const Summary = () => {
  const { state } = useTransactionContext();

  return (
    <div className="summary-container">
      <h2>
        Total Income: &nbsp;&nbsp;
        <span className="income">{roundToTwoDp(state.totalIncome)}</span>
      </h2>
      <h2>
        Total Expenses: &nbsp;&nbsp;
        <span className="expense">
          {roundToTwoDp(state.totalExpenses * -1)}
        </span>
      </h2>
      <h2>
        Net Total: &nbsp;&nbsp;
        <span className={state.netTotal >= 0 ? "income" : "expense"}>
          {roundToTwoDp(state.netTotal)}
        </span>
      </h2>
    </div>
  );
};

export default Summary;
