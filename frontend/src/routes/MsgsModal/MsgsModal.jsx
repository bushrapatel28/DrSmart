import './MsgsModal.scss'

const MsgsModal = ({patientMsgs, closeMsgsModal}) => {

  return (
    <>
    <button className="photo-details-modal__close-button" onClick={() => closeMsgsModal()}>
      <p>Close</p>
    </button>

    <h3>This is MSGS modal</h3>
    <p>This is patients record: {patientMsgs} </p>
    
    </>
  )
}

export default MsgsModal;