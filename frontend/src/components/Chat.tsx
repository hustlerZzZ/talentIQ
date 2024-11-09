import { MdChat } from "react-icons/md";

function Chats() {
  return (
    <>
      <button
        className={`px-3 py-3 bg-zinc-800 flex justify-center items-center rounded-full`}
      >
        <MdChat className={`text-white text-xl rounded-full`} />
      </button>
    </>
  );
}

export default Chats;
