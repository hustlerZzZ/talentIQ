import { useParams, useNavigate } from "react-router-dom";
import VideoConf from "./VideoConf";

// Generate a random name
const getRandomName = () => {
  const names = [
    "Alex",
    "Blake",
    "Casey",
    "Drew",
    "Eden",
    "Finn",
    "Glenn",
    "Harper",
    "Ian",
    "Jordan",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Join page component
export const JoinInterview = () => {
  const navigate = useNavigate();
  const roomId = "23"; // Fixed room for simplicity

  const joinAsInterviewer = () => {
    navigate(`/interview/room/${roomId}/interviewer`);
  };

  const joinAsInterviewee = () => {
    navigate(`/interview/room/${roomId}/interviewee`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">Join Interview</h1>
        <p className="text-gray-600 mb-4">
          Your random name: {getRandomName()}
        </p>
        <div className="space-y-4">
          <button
            onClick={joinAsInterviewer}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Join as Interviewer
          </button>
          <button
            onClick={joinAsInterviewee}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Join as Interviewee
          </button>
        </div>
      </div>
    </div>
  );
};

// Room component
export const Room = () => {
  const { roomId, role } = useParams();

  // Add console.log to debug
  console.log("Room mounted with:", { roomId, role });

  if (!roomId || !role) {
    return <h1>Invalid room parameters</h1>;
  }

  return (
    <div className="text-black bg-black w-full z-10">
      <h1 className="text-black">Hello world</h1>
      <VideoConf role={role} roomId={roomId} />
    </div>
  );
};
