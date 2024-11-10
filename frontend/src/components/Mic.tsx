import { FaMicrophone } from "react-icons/fa";


function Mic() {
  return (
    <>
      <button className="px-3 py-3 bg-zinc-800 rounded-full flex justify-center items-center">
        <FaMicrophone className="text-white text-xl" />
      </button>
    </>
  );
}

export default Mic