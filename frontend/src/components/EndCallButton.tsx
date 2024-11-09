import { ImPhoneHangUp } from "react-icons/im";

function EndCallButton() {
    return (
    <>
      
          <button className="px-5 py-3 bg-red-700 rounded-lg flex justify-center items-center">
            <ImPhoneHangUp className="text-white text-xl" />
          </button>
        
      
    </>
  );
}

export default EndCallButton;
