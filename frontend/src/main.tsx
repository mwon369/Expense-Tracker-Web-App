import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TransactionContextProvider } from "./context/TransactionContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TransactionContextProvider>
      <App />
    </TransactionContextProvider>
  </React.StrictMode>
);
