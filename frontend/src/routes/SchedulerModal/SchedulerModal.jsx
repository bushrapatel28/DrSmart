import './SchedulerModal.scss';
import Schedule from '../../components/Schedule/Schedule'


const SchedulerModal = ({
  docStartDate,
  isSchedulerOpen,
  closeSchedulerModal,
  setDocStartDate,
  docEndDate,
  setDocEndDate,
  docStartTime,
  setDocStartTime,
  docEndTime,
  setDocEndTime,
  docOnChange,
  setAvailability,
  timeSlots,
  add
}) => {

  return (
    <>
      {isSchedulerOpen && (
        <div  className="modal">
          <div className="modal__content">
          <button className="modal__close-button" onClick={() => closeSchedulerModal()}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Select Your Next Week's Schedule</h3>
            <Schedule 
            docStartDate={docStartDate}
            setDocStartDate={setDocStartDate}
            docEndDate={docEndDate}
            setDocEndDate={setDocEndDate}
            docStartTime={docStartTime}
            setDocStartTime={setDocStartTime}
            docEndTime={docEndTime}
            setDocEndTime={setDocEndTime}
            docOnChange={docOnChange}
            setAvailability={setAvailability}
            timeSlots={timeSlots}
            add={add}
            />
          </div>
        </div>
      )}
    </>
  )
};

export default SchedulerModal;
