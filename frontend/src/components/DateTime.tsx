const CurrentDateTimeComponent = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="w-full h-28 rounded-lg bg-zinc-700 flex flex-col gap-3 items-center p-6">

      <p className="text-white text-3xl">{currentTime}</p>
      <p className="text-white">{currentDate}</p>
    </div>
  );
};

export default CurrentDateTimeComponent;
