import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonthlySchedulePage from "./pages/schedule/monthly_schedule/MonthlySchedulePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MonthlySchedulePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
