

function Modal() {
  return (
    <>
      <div className="h-screen bg-[#242629] flex items-center justify-center">
        <div className="flex flex-col gap-4 text-white w-1/3 items-center bg-zinc-700 p-6 rounded-md">
          <h1 className="text-2xl font-semibold ">Schedule Meeting</h1>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-1/3">
              <label>Name</label>
              <input
                type="text"
                className="p-2 w-full rounded-md bg-[#33353C] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 w-2/3">
              <label>Email</label>
              <input
                type="text"
                className="p-2 w-full rounded-md bg-[#33353C] outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Description</label>
            <textarea className="p-2 w-full rounded-md bg-[#33353C] min-h-20 outline-none" />
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-1/3">
              <label>Time</label>
              <input
                type="time" min="0" max="24"
                className="p-2 w-full rounded-md bg-[#33353C] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <label>Date</label>
              <input
                type="date"
                className="p-2 w-full rounded-md bg-[#33353C] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <label>Duration</label>
              <input
                type="time"
                className="p-2 w-full rounded-md bg-[#33353C] outline-none"
              />
            </div>
          </div>
            <button className="bg-[#2F80ED] w-full text-white px- py-3 rounded-md">Schedule</button>
        </div>
      </div>
    </>
  );
}

export default Modal