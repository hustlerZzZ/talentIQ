import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Interviewer from "./interviewer-dashboard/interviewer";
import Interviewee from "./interviewee-dashboard/Interviewee";
import Home from "./Landing/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/interviewer" element={<Interviewer />} />
        <Route path="/interviewee" element={<Interviewee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App