import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
          <Route path="/*" element={<App/>}/>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
