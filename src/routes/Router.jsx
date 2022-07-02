import React from "react";

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

// components
import Login from "../components/authentication/Login";
import Timesheet from "../components/timesheet/Timesheet";

// styles
import "../App.css";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="timesheets" element={<Timesheet />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
