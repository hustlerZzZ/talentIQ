import Chats from "../../components/Chat.tsx";
import CodeEditor from "../../components/CodeEditor.tsx";
import Emoji from "../../components/Emoji.tsx";
import EndCallButton from "../../components/EndCallButton.tsx";
import Mic from "../../components/Mic.tsx";
import Quiz from "../../components/Quiz.tsx";
import Setting from "../../components/Setting.tsx";
import VideoCall from "../../components/VideoCall.tsx";
import ChatContainer from "../../components/ChatContainer.tsx";

function Interviewee() {
  return (
    <>
      <div className="w-full grid grid-cols-10 grid-rows-[auto_1fr] h-screen gap-6 p-6 bg-[#242629]">
        <div className="col-span-10 py-4 px-6 bg-[#16161a] rounded-md flex items-center justify-between">
          <div className="flex gap-4">
            <Quiz />
            <CodeEditor />
            <Chats />
          </div>
          <div className="flex gap-4">
            <Emoji />
            <Mic />
            <VideoCall />
          </div>

          <div className="flex gap-4 ">
            <Setting />
            <EndCallButton />
          </div>
        </div>

        <div className="col-span-4 row-span-9 bg-black rounded-md">
          <ChatContainer />
        </div>
        <div className="col-span-6 row-span-9 bg-black rounded-md"></div>
      </div>
    </>
  );
}

export default Interviewee;
