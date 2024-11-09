import { FaBell } from "react-icons/fa";

function Notification() {
  return (
    <>
      <button
        className={`px-3 py-3 bg-zinc-800 flex justify-center items-center rounded-full`}
      >
        <FaBell className={`text-white text-xl rounded-full`} />
      </button>
    </>
  );
}

export default Notification;
