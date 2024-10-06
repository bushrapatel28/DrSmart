import Appointment from "../../components/Appointment/Appointment";

const AppointmentModal = ({
  isAppointmentOpen,
  closeAppointmentModal,
  toggleAppointmentType,
  doctorData,
  startDate,
  startTime,
  isVirtual,
  showDoc,
  saveDoctorInfo,
  selectDateTime,
  next,
  back,
  save,
  cancel,
  filterPassedTime
}) => {
  return (
    <>
      {isAppointmentOpen && (
        <div  className="modal">
          <div className="modal__content">
            <button className="modal__close-button" onClick={() => closeAppointmentModal()}>
              <span>&times;</span>
            </button>
            <h3 className="modal__heading">Book Your Appointment</h3>
              <Appointment 
                closeAppointmentModal={closeAppointmentModal}
                toggleAppointmentType={toggleAppointmentType}
                doctorData={doctorData}
                startDate={startDate}
                startTime={startTime}
                isVirtual={isVirtual}
                showDoc={showDoc}
                saveDoctorInfo={saveDoctorInfo}
                selectDateTime={selectDateTime}
                next={next}
                back={back}
                save={save}
                cancel={cancel}
                filterPassedTime={filterPassedTime}
              />
          </div>
        </div>
      )}
    </>
  )
};

export default AppointmentModal;