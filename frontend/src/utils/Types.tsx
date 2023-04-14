import { TransactionCategory } from "../../../backend/models/transactionCategory";

export type Transaction = {
  _id: string;
  value: number;
  date: string;
  transactionCategory: TransactionCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
};
