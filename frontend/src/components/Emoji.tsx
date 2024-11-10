import { MdEmojiEmotions } from "react-icons/md";


function Emoji() {
  return (
    <>
      <button className="px-3 py-3 bg-zinc-800 rounded-full flex justify-center items-center">
        <MdEmojiEmotions className="text-white text-xl" />
      </button>
    </>
  );
}

export default Emoji