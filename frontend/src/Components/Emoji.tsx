import { MdEmojiEmotions } from "react-icons/md";


function Emoji() {
  return (
    <>
        <button className="px-6 py-4 bg-zinc-700 rounded-lg flex justify-center items-center">
            <MdEmojiEmotions className="text-white text-2xl" />
          </button>
    </>
  )
}

export default Emoji