const CurrentDateTimeComponent = ({
  dateClass,
  timeClass,
}: {
  dateClass: string;
  timeClass: string;
}) => {
  const currentDate = new Date().toLocaleDateString(); // Get current date in locale format
  const currentTime = new Date().toLocaleTimeString(); // Get current time in locale format

  return (
    <div>
      <p className={`${dateClass}`}>Current Date: {currentDate}</p>
      <p className={`${timeClass}`}>Current Time: {currentTime}</p>
    </div>
  );
};

export default CurrentDateTimeComponent;
