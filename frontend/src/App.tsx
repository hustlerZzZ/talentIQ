import { BrowserRouter, Route, Routes } from "react-router-dom";
import InterviewerDashboard from "./pages/Interviewer-dashboard/Interviewer-dashboard.tsx";
import Interviewee from "./pages/interviewee-app/Interviewee";
import Interviewer from "./pages/interviewer-app/interviewer.tsx";
import Home from "./pages/Landing/Home";
import Pricing from "./pages/Pricing/Pricing";
import ChatContainer from "./components/ChatContainer";
import { SignedIn } from "@clerk/clerk-react";
import CodeEditor from "./components/CodeEditor.tsx";
import VideoConf from "./pages/VideoConf.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/interviewer-dashboard"
          element={
            <SignedIn>
              <InterviewerDashboard />
            </SignedIn>
          }
        />
        <Route
          path="/interviewer-app"
          element={
            <SignedIn>
              <Interviewer />
            </SignedIn>
          }
        />
        <Route path="/interviewee-app" element={<Interviewee />} />
        <Route
          path="/interview"
          element={<VideoConf role="interviewer" roomId="interview-123" />}
        />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/chatbot" element={<ChatContainer />} />
        <Route path="/code-editor" element={<CodeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
