import './FunctionBlock.scss';

const FunctionBlock = ({icon, label, openModal}) => {
  return (
    <div className="function-block" onClick={() => openModal(4)}>
      {/* <div className="icon">{icon}</div> */}
      <img src={icon} />
      <div className="label">{label}</div>
    </div>
  );
};

export default FunctionBlock;
