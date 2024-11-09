import { FaBell } from "react-icons/fa";

function Notification() {
  return (
    <>
      <button
        className={`px-5 py-3 bg-zinc-700  flex justify-center items-center `}
      >
        <FaBell className={`text-white text-xl `} />
      </button>
    </>
  );
}

export default Notification;
