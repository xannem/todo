import * as React from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
