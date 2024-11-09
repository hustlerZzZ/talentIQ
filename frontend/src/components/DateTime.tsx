const CurrentDateTimeComponent = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div>
      <p className="text-white">Current Date: {currentDate}</p>
      <p className="text-white">Current Time: {currentTime}</p>
    </div>
  );
};

export default CurrentDateTimeComponent;
