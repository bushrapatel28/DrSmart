import './ScheduleAppModal.scss';

const ScheduleAppModal = ({icon,label}) => {
  // const icon = "📅"
  // const label = "Book an Appointment"
  return (
    <div className="function-block">
      {/* <div className="icon">{icon}</div> */}
      <img src={icon} />
      <div className="label">{label}</div>
    </div>
  );
};

export default ScheduleAppModal;
