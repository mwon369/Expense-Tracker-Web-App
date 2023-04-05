import { TransactionCategory } from "../../../backend/models/transactionCategory";
import { ObjectId } from "mongodb";

export type Transaction = {
  _id: ObjectId;
  value: Number;
  date: Date;
  transactionCategory: TransactionCategory;
  description: string;
};
