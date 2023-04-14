import { TransactionCategory } from "../../../backend/models/transactionCategory";
import { Transaction } from "../utils/Types";
import {
  createContext,
  useReducer,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
} from "react";

interface ITransactionState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netTotal: number;
}

type TransactionAction =
  | { type: TRANSACTION_STATE_ACTIONS.SET_ALL; payload: Transaction[] }
  | { type: TRANSACTION_STATE_ACTIONS.SET_BY_ID; payload: Transaction }
  | { type: TRANSACTION_STATE_ACTIONS.CREATE_NEW; payload: Transaction }
  | { type: TRANSACTION_STATE_ACTIONS.UPDATE_BY_ID; payload: Transaction }
  | { type: TRANSACTION_STATE_ACTIONS.DELETE_BY_ID; payload: Transaction };

interface ITransactionContext {
  state: ITransactionState;
  dispatch: Dispatch<TransactionAction>;
}

export enum TRANSACTION_STATE_ACTIONS {
  SET_ALL = "SET_ALL",
  SET_BY_ID = "SET_BY_ID",
  CREATE_NEW = "CREATE_NEW",
  UPDATE_BY_ID = "UPDATE_BY_ID",
  DELETE_BY_ID = "DELETE_BY_ID",
}

export const TransactionContext = createContext<ITransactionContext>({
  state: {
    transactions: [],
    totalIncome: 0,
    totalExpenses: 0,
    netTotal: 0,
  },
  dispatch: () => null,
});

const sumIncomeOrExpenses = (
  transactions: Transaction[],
  transactionType: TransactionCategory
) => {
  let result = transactions.reduce((total, t) => {
    return t.transactionCategory === transactionType ? total + t.value : total;
  }, 0);

  return result;
};

export const transactionReducer = (
  state: ITransactionState,
  action: TransactionAction
) => {
  let totalIncome = 0;
  let totalExpenses = 0;
  let netTotal = 0;
  let updatedTransactions: Transaction[] = [];

  switch (action.type) {
    case TRANSACTION_STATE_ACTIONS.SET_ALL:
      totalIncome = sumIncomeOrExpenses(
        action.payload,
        TransactionCategory.INCOME
      );
      totalExpenses = sumIncomeOrExpenses(
        action.payload,
        TransactionCategory.EXPENSE
      );
      netTotal = totalIncome - totalExpenses;
      return {
        ...state,
        transactions: action.payload,
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        netTotal: netTotal,
      };
    case TRANSACTION_STATE_ACTIONS.SET_BY_ID:
      return {
        ...state,
        transactions: [action.payload],
      };
    case TRANSACTION_STATE_ACTIONS.CREATE_NEW:
    case TRANSACTION_STATE_ACTIONS.UPDATE_BY_ID:
      updatedTransactions = [action.payload, ...state.transactions];
      totalIncome = sumIncomeOrExpenses(
        updatedTransactions,
        TransactionCategory.INCOME
      );
      totalExpenses = sumIncomeOrExpenses(
        updatedTransactions,
        TransactionCategory.EXPENSE
      );
      netTotal = totalIncome - totalExpenses;
      return {
        ...state,
        transactions: updatedTransactions,
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        netTotal: netTotal,
      };
    case TRANSACTION_STATE_ACTIONS.DELETE_BY_ID:
      updatedTransactions = state.transactions.filter(
        (t) => t._id !== action.payload._id
      );
      totalIncome = sumIncomeOrExpenses(
        updatedTransactions,
        TransactionCategory.INCOME
      );
      totalExpenses = sumIncomeOrExpenses(
        updatedTransactions,
        TransactionCategory.EXPENSE
      );
      netTotal = totalIncome - totalExpenses;
      return {
        ...state,
        transactions: updatedTransactions,
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        netTotal: netTotal,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider: FunctionComponent<
  PropsWithChildren<{}>
> = (props) => {
  const initialState: ITransactionState = {
    transactions: [],
    totalIncome: 0,
    totalExpenses: 0,
    netTotal: 0,
  };
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return <TransactionContext.Provider value={{ state, dispatch }} {...props} />;
};
