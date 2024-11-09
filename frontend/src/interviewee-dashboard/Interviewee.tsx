

import Chats from "../Components/Chat";
import CodeEditor from "../Components/CodeEditor";
import Emoji from "../Components/Emoji";
import EndCallButton from "../Components/EndCallButton";
import Mic from "../Components/Mic";
import Quiz from "../Components/Quiz";
import Setting from "../Components/Setting";
import VideoCall from "../Components/VideoCall";

function Interviewee() {
  return (
    <>
      <div className="w-full grid grid-cols-10 grid-rows-[auto_1fr] h-screen gap-6 p-6 bg-[#242629]">
        <div className="col-span-10 py-4 px-6 bg-[#16161a] rounded-md flex items-center justify-between">
          <div className="flex gap-4">
          <Quiz/>
          <CodeEditor/>
          <Chats/>

          </div>
          <div className="flex gap-4">

          <Emoji/>
          <Mic/>
          <VideoCall/>
          </div>
          
          <div className="flex gap-4 ">
          
          
          <Setting/>
          <EndCallButton />

          </div>
        </div>
        
          <div className="col-span-4 row-span-9 bg-black rounded-md"></div>
          <div className="col-span-6 row-span-9 bg-black rounded-md"></div>
        
      </div>
    </>
  );
}

export default Interviewee;
