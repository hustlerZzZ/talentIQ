import { IoVideocam } from "react-icons/io5";

function VideoCall() {
  return (
    <>
      <button
        className={`px-5 py-3 bg-zinc-700 rounded-lg flex justify-center items-center `}
      >
        <IoVideocam className={`text-white text-xl `} />
      </button>
    </>
  );
}

export default VideoCall;
