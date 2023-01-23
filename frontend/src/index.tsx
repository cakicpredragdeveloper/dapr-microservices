import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import DependencyContainer from "./dependency/DependencyContainer";

import App from "./gui/App";
import { store } from "./gui/redux/store";

import reportWebVitals from "./reportWebVitals";

export const dependencyContainer = new DependencyContainer();
dependencyContainer.createDependency(process.env);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
