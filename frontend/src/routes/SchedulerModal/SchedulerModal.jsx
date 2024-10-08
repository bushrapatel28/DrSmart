import './SchedulerModal.scss';
import Schedule from '../../components/Schedule/Schedule'


const SchedulerModal = ({
  isSchedulerOpen,
  closeSchedulerModal,
  schedulerState,
  // docStartDate,
  // docEndDate,
  // docStartTime,
  // docEndTime,
  datesOnChange,
  docStartTimeOnChange,
  docEndTimeOnChange,
  setAvailability,
  saveSchedule,
  // selectedRanges,
  deleteAvailability,
  clearSchedule
}) => {

  return (
    <>
      {isSchedulerOpen && (
        <div  className="modal">
          <div className="modal__content">
          <button className="modal__close-button" onClick={() => {closeSchedulerModal(); clearSchedule();}}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Select Your Next Week's Schedule</h3>
            <Schedule 
              schedulerState={schedulerState}
              // docStartDate={docStartDate}
              // docEndDate={docEndDate}
              // docStartTime={docStartTime}
              // docEndTime={docEndTime}
              datesOnChange={datesOnChange}
              docStartTimeOnChange={docStartTimeOnChange}
              docEndTimeOnChange={docEndTimeOnChange}
              setAvailability={setAvailability}
              saveSchedule={saveSchedule}
              // selectedRanges={selectedRanges}
              deleteAvailability={deleteAvailability}
            />
          </div>
        </div>
      )}
    </>
  )
};

export default SchedulerModal;
