import './ScheduleAppModal.scss';

const ScheduleAppModal = ({icon, label, openRecordModal}) => {
  // const icon = "📅"
  // const label = "Book an Appointment"
  return (
    <div className="function-block" onClick={() => openRecordModal(5)}>
      {/* <div className="icon">{icon}</div> */}
      <img src={icon} />
      <div className="label">{label}</div>
    </div>
  );
};

export default ScheduleAppModal;
