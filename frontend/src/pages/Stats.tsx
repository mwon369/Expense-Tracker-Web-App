import React from "react";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { roundToTwoDp } from "../utils/HelperFunctions";

const Stats = () => {
  const { state } = useTransactionContext();

  return (
    <div>
      <h2>Total Income: &nbsp; {roundToTwoDp(state.totalIncome)}</h2>
      <h2>Total Expenses: &nbsp; {roundToTwoDp(state.totalExpenses * -1)}</h2>
      <h2>Net Total: &nbsp; {roundToTwoDp(state.netTotal)}</h2>
    </div>
  );
};

export default Stats;
