import React from "react";
import { Transaction } from "../utils/Types";
import { TransactionCategory } from "../../../backend/models/transactionCategory";

const TransactionDetails = (transactionProps: Transaction) => {
  const { value, date, transactionCategory, description } = transactionProps;
  const dateParsed = new Date(date);
  return (
    <div className="transaction-details">
      <h4
        className={
          transactionCategory === TransactionCategory.INCOME
            ? "income"
            : "expense"
        }
      >{`${value} (${transactionCategory})`}</h4>
      <p>
        <strong>Date: &nbsp; </strong>
        {dateParsed.toDateString()}
      </p>
      <p>
        <strong>Description: &nbsp; </strong>
        {description}
      </p>
    </div>
  );
};

export default TransactionDetails;
