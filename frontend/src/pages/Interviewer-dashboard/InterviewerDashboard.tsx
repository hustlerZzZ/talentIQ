import VideoCall from "../../components/VideoCall";

import Setting from "../../components/Setting";

import AddMeeting from "../../components/ui/AddMeetting";
import Notification from "../../components/Notification";
import Chats from "../../components/Chat";
import DateTime from "../../components/DateTime";
function InterviewerDashboard() {
  return (
    <>
      <div className="w-full grid grid-cols-10 grid-rows-[auto_1fr] h-screen gap-6 p-6 bg-[#242629]">
        <div className="col-span-10 py-4 px-6 bg-[#16161a] rounded-md flex items-center justify-between">
          <div className="text-white text-xl">talentAid</div>
          <div className="flex gap-4 ">
            <Setting />
            <Notification className="bg-zinc-800 rounded-full" icon="" />
            <Chats className="rounded-full bg-zinc-800" icon="" />
          </div>
        </div>
        <div className="col-span-7 row-span-9 gap-6 bg-[#16161a] rounded-md flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center py-24 px-24 rounded-md bg-zinc-800">
            <VideoCall className="rounded-2xl bg-orange-500" icon="text-7xl" />
            <div className="text-white">New meeting</div>
          </div>
          <div className="flex flex-col gap-2 items-center py-24 px-24 rounded-md bg-zinc-800">
            <AddMeeting className="rounded-2xl bg-blue-500" icon="text-7xl" />
            <div className="text-white">Add Meeting</div>
          </div>
        </div>
        <div className="col-span-3 row-span-9 bg-[#16161a] rounded-md">
            <DateTime dateclass='text-white'  timeclass='text-white'/>
        </div>
      </div>
    </>
  );
}

export default InterviewerDashboard;
