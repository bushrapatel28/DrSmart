import React from "react";

const DoctorListItem = (props) => {
  const apptDate = props.appointmentDate.toISOString().slice(0, 10); // YYYY-MM-DD Format without the Time
  const apptTime = props.appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); // hh:mm:ss Format for 24hrs

  return (
    <div className="doctors-list-item">
      {props.availability.map((avail) => {
        if (avail.date === apptDate && avail.vacant) {
          const startTime = avail.time[0].start_time;
          const endTime = avail.time[0].end_time;

          if (startTime <= apptTime && endTime > apptTime) {
            return (
              <div
                key={props.id}
                className={`available-doctor ${props.isSelected ? 'selected' : ''}`} // Add 'selected' class conditionally
                onClick={() => props.onClick(props.id)}
              >
                <div className="doctor-profile-image">
                  <img
                    src={props.profile}
                    alt="Profile-Photo"
                  />
                </div>
                <div className="doctor-name">
                  {props.doctorName}
                </div>
                <div className="doctor-speciality">
                  {props.specialization}
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
