import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import "./scss/custom.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/user";

import axios from "./shared/axios";
import "./shared/i18n";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const currentEmail = localStorage.getItem("currentEmail");
if (currentEmail) {
  axios
    .get(`student/${currentEmail}`)
    .then((response) => {
      if (response.data.language === "Français") {
        localStorage.setItem("i18nextLng", "fr");
      } else if (response.data.language === "Arabic") {
        localStorage.setItem("i18nextLng", "ar");
      } else localStorage.setItem("i18nextLng", "en");
    });
}

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVials(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
