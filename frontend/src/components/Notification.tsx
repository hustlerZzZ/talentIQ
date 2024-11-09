import { FaBell } from "react-icons/fa";

function Notification({ className, icon }) {
  return (
    <>
      <button
        className={`px-5 py-3 bg-zinc-700  flex justify-center items-center ${className}`}
      >
        <FaBell className={`text-white text-xl ${icon}`} />
      </button>
    </>
  );
}

export default Notification;
