import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Timesheet from "./components/timesheet/Timesheet";
import Login from "./components/authentication/Login";
import App from "./App";
import Router from "./routes/Router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="root">
      <App />
    </div>
  </React.StrictMode>
);
