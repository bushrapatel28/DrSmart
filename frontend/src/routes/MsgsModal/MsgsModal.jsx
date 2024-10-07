import './MsgsModal.scss';

const MsgsModal = ({ msgsData, closeMsgsModal }) => {
  console.log("PATIENT MSG WITHIN MODAL: ", msgsData);
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <button className="modal__close-button" onClick={() => closeMsgsModal()}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Your Messages</h3>

          {msgsData && msgsData.length > 0 ? (
            <ul className="modal__msg-list">
              {msgsData.map((msgObj, index) => (
                <li key={index} className="modal__msg-item">
                  `{msgObj.message} with {msgObj.doctor_name}`
                </li>
              ))}
            </ul>
          ) : (
            <p>No messages available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MsgsModal;
