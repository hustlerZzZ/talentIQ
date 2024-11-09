import { FaPlus } from "react-icons/fa6";

function AddMeeting({ className, icon }) {
  return (
    <>
      <button
        className={`px-5 py-3 bg-zinc-700 rounded-lg flex justify-center items-center ${className}`}
      >
        <FaPlus className={`text-white text-xl ${icon}`} />
      </button>
    </>
  );
}

export default AddMeeting;
