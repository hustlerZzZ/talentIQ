import { BrowserRouter, Route, Routes } from "react-router-dom";
import InterviewerDashboard from "./pages/Interviewer-dashboard/Interviewer-dashboard.tsx";
import Interviewee from "./pages/interviewee-app/Interviewee";
import Home from "./pages/Landing/Home";
import Pricing from "./pages/Pricing/Pricing";
import ChatContainer from "./components/ChatContainer";
import { SignedIn } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/interviewer-dashboard"
          element={
            <SignedIn>
              <Interviewer-dashboard />
            </SignedIn>
          }
        />
        <Route path="/interviewee" element={<Interviewee />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/interviewer-dashboard"
          element={<InterviewerDashboard />}
        />
        <Route path="/chatbot" element={<ChatContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
