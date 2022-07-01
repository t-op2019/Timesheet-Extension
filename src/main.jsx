import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Timesheet from "./components/timesheet/Timesheet";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="root">
      <Timesheet />
    </div>
  </React.StrictMode>
);
