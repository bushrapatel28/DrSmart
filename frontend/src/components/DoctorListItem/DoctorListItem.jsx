import React from "react";

const DoctorListItem = (props) => {

  const {
    id,
    doctorName,
    profile,
    specialization,
    availabilities,
    appointmentDate,
    appointmentTime,
    onClick,
    isSelected
  } = props;

  const apptDate = appointmentDate.toISOString().slice(0, 10); // YYYY-MM-DD Format without the Time
  const apptTime = appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); // hh:mm:ss Format for 24hrs

  return (
    <div className="doctors-list-item">
      {availabilities.map((availability) => {
        if (availability.date === apptDate && availability.vacant) {
          const startTime = availability.time[0].start_time;
          const endTime = availability.time[0].end_time;

          if (startTime <= apptTime && endTime > apptTime) {
            return (
              <div
                key={id}
                className={`available-doctor ${isSelected ? 'selected' : ''}`} // Add 'selected' class conditionally
                onClick={() => onClick(id)}
              >
                <div className="doctor-profile-image">
                  <img
                    src={profile}
                    alt="Profile-Photo"
                  />
                </div>
                <div className="doctor-name">
                  {doctorName}
                </div>
                <div className="doctor-speciality">
                  {specialization}
                </div>
              </div>
            );
          }
        }
        return null; // Return null if no valid appointment time is found
      })}
    </div>
  )
}

export default DoctorListItem;
