import { TransactionCategory } from "../../../backend/models/transactionCategory";
import { ObjectId } from "mongodb";

export interface Transaction {
  _id: ObjectId;
  value: number;
  date: string;
  transactionCategory: TransactionCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
}
