import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TransactionsContextProvider } from "./context/TransactionsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TransactionsContextProvider>
      <App />
    </TransactionsContextProvider>
  </React.StrictMode>
);
