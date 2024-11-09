import { BrowserRouter, Route, Routes } from "react-router-dom";
import Interviewer from "./pages/Interviewer Dashboard/interviewer";
import Interviewee from "./pages/Interviewee Dashboard/Interviewee";
import Home from "./pages/Landing/Home";
import Pricing from "./pages/Pricing/Pricing";
import InterviewerDashboard from "./pages/Interviewer Dashboard/InterviewerDashboard";

import ChatContainer from "./components/ChatContainer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/interviewer" element={<Interviewer />} />
        <Route path="/interviewee" element={<Interviewee />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/interviewer-dashboard" element={<InterviewerDashboard />} />
        <Route path="/chatbot" element={<ChatContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
