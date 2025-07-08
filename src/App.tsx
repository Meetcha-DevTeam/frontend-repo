import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SchedulePage from "./pages/schedule/SchedulePage";
import LoginContainer from "./pages/login/components/LoginContainer";
import LoginCompleteContainer from "./pages/login_complete/components/LoginCompleteContainer";
import BackgroundPage from "./pages/background/BackgroundPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<LoginContainer />}></Route>
        <Route index path="/login_complete" element={<LoginCompleteContainer />}></Route>
        <Route index path="/" element={<BackgroundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
