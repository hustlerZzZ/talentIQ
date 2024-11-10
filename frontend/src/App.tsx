import { BrowserRouter, Route, Routes } from "react-router-dom";
import InterviewerDashboard from "./pages/Interviewer-dashboard/Interviewer-dashboard.tsx";
import Interviewee from "./pages/interviewee-app/Interviewee";
import Interviewer from "./pages/interviewer-app/interviewer.tsx";
import Home from "./pages/Landing/Home";
import Pricing from "./pages/Pricing/Pricing";
import ChatContainer from "./components/ChatContainer";
import { SignedIn } from "@clerk/clerk-react";
import CodeEditor from "./components/CodeEditor.tsx";
import Layout from "./components/Layout.tsx";
import { JoinInterview, Room } from "./pages/JoinInterview.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
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

        <Route path="interview">
          <Route index element={<JoinInterview />} />
          <Route path="room/:roomId/:role" element={<Room />} />
        </Route>

        <Route path="/chatbot" element={<ChatContainer />} />
        <Route path="/code-editor" element={<CodeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
