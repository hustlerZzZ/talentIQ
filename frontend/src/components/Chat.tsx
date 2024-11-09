import { MdChat } from "react-icons/md";

function Chats() {
  return (
    <>
      <button
        className={`px-5 py-3 bg-zinc-700  flex justify-center items-center rounded-full`}
      >
        <MdChat className={`text-white text-xl rounded-full`} />
      </button>
    </>
  );
}

export default Chats;
