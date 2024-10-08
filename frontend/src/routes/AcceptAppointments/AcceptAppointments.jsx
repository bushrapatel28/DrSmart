// AcceptAppointments.jsx
import './AcceptAppointments.scss';
import AppointmentTable from './AppointmentTable';

const AcceptAppointments = ({ apptData, closeAcceptApptModal, handleAppt}) => {
  // Separate appointments by status
  // console.log("Accept Appt Modal@@@@@: ", apptData);
  if (!apptData || apptData.length === 0) {
    return <p>No appointments available</p>;
  }
  
  const bookedAppointments = apptData.filter(appt => {
    // console.log("@@@@@@@@@Accept Appt Modal: ", appt);
    return appt.status === 'Scheduled' || appt.status === 'Accepted' 
  });
  const pendingAppointments = apptData.filter(appt => appt.status === 'Pending');
  const completedAppointments = apptData.filter(appt => appt.status === 'Completed');

  return (
    <>
      <div className="modal">
        <div className="modal__accept-appt">
          <button className="modal__close-button" onClick={closeAcceptApptModal}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Appointments</h3>

          <AppointmentTable appointments={bookedAppointments} title="Booked Appointments" handleAppt={handleAppt} />
          <AppointmentTable appointments={pendingAppointments} title="Pending Appointments" handleAppt={handleAppt} />
          <AppointmentTable appointments={completedAppointments} title="Completed Appointments" />
        </div>
      </div>
    </>
  );
};

export default AcceptAppointments;
