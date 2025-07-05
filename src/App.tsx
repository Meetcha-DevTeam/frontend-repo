import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundPage from "./pages/background/BackgroundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<BackgroundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
