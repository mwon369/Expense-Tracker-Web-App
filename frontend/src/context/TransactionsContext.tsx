import { Transaction } from "mongodb";
import { createContext } from "react";

export const TransactionsContext = createContext<Transaction[] | null>(null);
