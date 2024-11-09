import { MdEmojiEmotions } from "react-icons/md";


function Emoji() {
  return (
    <>
        <button className="px-5 py-3  bg-zinc-700 rounded-lg flex justify-center items-center">
            <MdEmojiEmotions className="text-white text-xl" />
          </button>
    </>
  )
}

export default Emoji