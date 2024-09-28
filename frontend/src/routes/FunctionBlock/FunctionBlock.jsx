import './FunctionBlock.scss';

const FunctionBlock = ({icon, label, openModal}) => {
  // const icon = "📅"
  // const label = "Book an Appointment"
  return (
    <div className="function-block" onClick={() => openModal(5)}>
      {/* <div className="icon">{icon}</div> */}
      <img src={icon} />
      <div className="label">{label}</div>
    </div>
  );
};

export default FunctionBlock;
