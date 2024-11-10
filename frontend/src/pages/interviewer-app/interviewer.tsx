import Quiz from "../../components/Quiz.tsx";
import CodeEditor from "../../components/CodeEditor.tsx";
import Chats from "../../components/Chat.tsx";
import Emoji from "../../components/Emoji.tsx";
import Mic from "../../components/Mic.tsx";
import VideoCall from "../../components/VideoCall.tsx";
import Setting from "../../components/Setting.tsx";
import EndCallButton from "../../components/EndCallButton.tsx";

import { FaPython } from "react-icons/fa";



function interviewer() {

  return (
    <div className="w-full grid grid-cols-10 grid-rows-[auto_1fr] h-screen gap-6 p-6 bg-[#242629]">
      <div className="col-span-10 py-4 px-6 bg-[#16161a] rounded-md flex items-center justify-between">
        <div className="flex gap-4">
          <Quiz />
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

      <div className="col-span-4 row-span-9 bg-black rounded-md relative px-5 py-2">
        <h2 className="text-white text-sm pb-4 py-2 font-bold">Text Editor</h2>
        <div
          className="bg-zinc-800 text-white w-32 h-8 absolute top-2 right-10
         cursor-pointer flex gap-3 rounded-xl space-y-20 justify-center items-center"
        >
          <FaPython />
          <h2>Python</h2>
        
      </div>    
        <CodeEditor />
      </div>

      <div className="col-span-6 row-span-9 bg-black rounded-md"></div>
    </div>
  );
}

export default interviewer;
