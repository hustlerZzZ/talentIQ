import { IoVideocam } from "react-icons/io5";



function VideoCall({className,icon}) {
  return (
    <>
         <button className={`px-5 py-3 bg-zinc-700 rounded-lg flex justify-center items-center ${className}`}>
            <IoVideocam className={`text-white text-xl ${icon}`} />
          </button>    
    </>
  )
}

export default VideoCall