

const CurrentDateTimeComponent = ({dateclass,timeclass}) => {
  const currentDate = new Date().toLocaleDateString(); // Get current date in locale format
  const currentTime = new Date().toLocaleTimeString(); // Get current time in locale format

  return (
    <div>
      <p className={`${dateclass}`}>Current Date: {currentDate}</p>
      <p className={`${timeclass}`}>Current Time: {currentTime}</p>
    </div>
  );
};

export default CurrentDateTimeComponent;
