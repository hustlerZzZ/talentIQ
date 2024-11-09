import { MdChat } from "react-icons/md";

function Chats({className,icon}) {
  return (
    <>
        <button className={`px-5 py-3 bg-zinc-700  flex justify-center items-center ${className}`}>
            <MdChat className={`text-white text-xl ${icon}`} />
             </button>
    </>
  )
}

export default Chats;