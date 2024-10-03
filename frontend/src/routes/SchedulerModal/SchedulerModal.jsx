import './SchedulerModal.scss';
import Schedule from '../../components/Schedule/Schedule'


const SchedulerModal = ({
  isSchedulerOpen,
  closeSchedulerModal,
  docStartDate,
  docEndDate,
  docStartTime,
  docEndTime,
  datesOnChange,
  docStartTimeOnChange,
  docEndTimeOnChange,
  setAvailability,
  saveSchedule
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
            docEndDate={docEndDate}
            docStartTime={docStartTime}
            docEndTime={docEndTime}
            datesOnChange={datesOnChange}
            docStartTimeOnChange={docStartTimeOnChange}
            docEndTimeOnChange={docEndTimeOnChange}
            setAvailability={setAvailability}
            saveSchedule={saveSchedule}
            />
          </div>
        </div>
      )}
    </>
  )
};

export default SchedulerModal;
