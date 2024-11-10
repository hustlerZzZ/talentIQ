import VideoCall from "../../components/VideoCall";
import Setting from "../../components/Setting";
import AddMeeting from "../../components/ui/AddMeetting";
import Notification from "../../components/Notification";
import Chats from "../../components/Chat";
import DateTime from "../../components/DateTime";
import { UserButton } from "@clerk/clerk-react";

import { useUser } from "@clerk/clerk-react";
import { useAppDispatch } from "../../redux/hooks/hooks.ts";
import {
  interviewerState,
  setInterviewer,
} from "../../redux/slice/interviewerSlice.ts";
import { useEffect } from "react";

import type { UserResource } from "@clerk/types";
import type { AppDispatch } from "../../redux/store";

const mapUserToInterviewer = (user: UserResource): interviewerState => ({
  email: user.primaryEmailAddress?.emailAddress || "",
  fullName: `${user.firstName || ""} ${user.lastName || ""}`,
});

function InterviewerDashboard() {
  const { user } = useUser() as { user: UserResource | null };
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const interviewerData = mapUserToInterviewer(user);
      dispatch(setInterviewer(interviewerData));
    }
  }, [user, dispatch]);

  return (
    <div className="w-full grid grid-cols-10 grid-rows-[auto_1fr] h-screen gap-6 p-6 bg-[#242629]">
      <div className="col-span-10 py-4 px-6 bg-[#16161a] rounded-md flex items-center justify-between">
        <div className="text-white text-xl">talentAid</div>
        <div className="flex gap-3 ">
          <Setting />
          <Notification />
          <Chats />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>
      <div className="col-span-7 row-span-9 gap-6 bg-[#16161a] rounded-md flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center py-24 px-24 rounded-md bg-zinc-800">
          <VideoCall />
          <div className="text-white">New meeting</div>
        </div>
        <div className="flex flex-col gap-2 items-center py-24 px-24 rounded-md bg-zinc-800">
          <AddMeeting className="rounded-2xl bg-blue-500" icon="text-7xl" />
          <div className="text-white">Add Meeting</div>
        </div>
      </div>
      <div className="col-span-3 row-span-9 bg-[#16161a] rounded-md">
        <DateTime />
      </div>
    </div>
  );
}

export default InterviewerDashboard;
