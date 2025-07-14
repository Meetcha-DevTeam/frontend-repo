import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "./pages/login/components/LoginContainer";
import LoginCompleteContainer from "./pages/login_complete/components/LoginCompleteContainer";
import BackgroundPage from "./pages/background/BackgroundPage";
import MeetingCreationPage from "./pages/meeting/create/MeetingCreationPage";
import MeetingDetailPage from "./pages/meeting/detail/MeetingDetailPage";
import ParticipantInfoPage from "./pages/meeting/participant/ParticipantInfoPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/participant" element={<ParticipantInfoPage />}></Route>
        <Route index path="/detail" element={<MeetingDetailPage />}></Route>
        <Route index path="/login" element={<LoginContainer />}></Route>
        <Route index path="/login_complete" element={<LoginCompleteContainer />}></Route>
        <Route index path="/" element={<BackgroundPage />}></Route>
        <Route index path="/meeting-creation" element={<MeetingCreationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
