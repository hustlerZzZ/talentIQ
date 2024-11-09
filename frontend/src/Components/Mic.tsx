import { FaMicrophone } from "react-icons/fa";


function Mic() {
  return (
    <>
        <button className="px-6 py-4 bg-zinc-700 rounded-lg flex justify-center items-center">
            <FaMicrophone className="text-white text-2xl" />
          </button>
    </>
  )
}

export default Mic