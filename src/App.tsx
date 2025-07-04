import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SchedulePage from "./pages/schedule/SchedulePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SchedulePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
