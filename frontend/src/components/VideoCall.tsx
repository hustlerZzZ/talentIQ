import { IoVideocam } from "react-icons/io5";

function VideoCall() {
  return (
    <>
      <button
        className={`px-3 py-3 bg-zinc-800 rounded-full flex justify-center items-center `}
      >
        <IoVideocam className={`text-white text-xl `} />
      </button>
    </>
  );
}

export default VideoCall;
