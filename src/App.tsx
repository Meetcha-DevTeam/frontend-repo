import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundPage from "./pages/background/BackgroundPage";
import MeetingCreationPage from "./pages/meeting/create/MeetingCreationPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<BackgroundPage />}></Route>
        <Route index path="/meeting-creation" element={<MeetingCreationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
