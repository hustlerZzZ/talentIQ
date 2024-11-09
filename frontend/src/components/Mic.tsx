import { FaMicrophone } from "react-icons/fa";


function Mic() {
  return (
    <>
        <button className="px-5 py-3 bg-zinc-700 rounded-lg flex justify-center items-center">
            <FaMicrophone className="text-white text-xl" />
          </button>
    </>
  )
}

export default Mic