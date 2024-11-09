const CurrentDateTimeComponent = ({
  dateClass,
  timeClass,
}: {
  dateClass: string;
  timeClass: string;
}) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div>
      <p className={`${dateClass}`}>Current Date: {currentDate}</p>
      <p className={`${timeClass}`}>Current Time: {currentTime}</p>
    </div>
  );
};

export default CurrentDateTimeComponent;
