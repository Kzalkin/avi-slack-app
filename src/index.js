import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
