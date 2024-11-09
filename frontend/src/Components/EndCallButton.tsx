import { ImPhoneHangUp } from "react-icons/im";

function EndCallButton() {
    return (
    <>
      
          <button className="px-6 py-4 bg-red-700 rounded-lg flex justify-center items-center">
            <ImPhoneHangUp className="text-white text-2xl" />
          </button>
        
      
    </>
  );
}

export default EndCallButton;
