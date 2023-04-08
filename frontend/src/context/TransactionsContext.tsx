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
}

interface ITransactionAction {
  type: string;
  payload: Transaction[] | Transaction;
}

interface ITransactionContext {
  state: ITransactionState;
  dispatch: Dispatch<ITransactionAction>;
}

export const STATE_ACTIONS = {
  GET_ALL: "GET_ALL",
  GET_BY_ID: "GET_BY_ID",
  CREATE_NEW: "CREATE_NEW",
  UPDATE_BY_ID: "UPDATE_BY_ID",
  DELETE_BY_ID: "DELETE_BY_ID",
};

export const TransactionContext = createContext<ITransactionContext>({
  state: {
    transactions: [],
  },
  dispatch: () => null,
});

export const transactionReducer = (
  state: ITransactionState,
  action: ITransactionAction
) => {
  switch (action.type) {
    case STATE_ACTIONS.GET_ALL:
      return {
        ...state,
        transactions: action.payload,
      };
    case STATE_ACTIONS.GET_BY_ID:
      return {
        ...state,
        transactions: [action.payload],
      };
    case STATE_ACTIONS.CREATE_NEW:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case STATE_ACTIONS.UPDATE_BY_ID:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case STATE_ACTIONS.DELETE_BY_ID:
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t._id.toString() !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const TransactionsContextProvider: FunctionComponent<
  PropsWithChildren<{}>
> = (props) => {
  const initialState: ITransactionState = { transactions: [] };
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return <TransactionContext.Provider value={{ state, dispatch }} {...props} />;
};
