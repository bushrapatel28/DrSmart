import React, { useState } from "react";
import DoctorListItem from "../DoctorListItem/DoctorListItem";

const DoctorList = (props) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State to track selected doctor

  const {
    doctorData,
    appointmentDate,
    appointmentTime,
    saveDoctorInfo,
    save,
    cancel,
    errorMsg
  } = props;

  const handleDoctorClick = (id) => {
    setSelectedDoctorId(id); // Update selected doctor ID
    saveDoctorInfo(id); // Call the provided click handler
  };

  return (
    <div className="doctors">
      <ul className="doctors-list">
        {doctorData.map((doctor) => {
          return (
            <DoctorListItem
              key={doctor.id}
              id={doctor.id}
              doctorName={doctor.name}
              profile={doctor.profile_img}
              specialization={doctor.specialization}
              availabilities={doctor.availability}
              appointmentDate={appointmentDate}
              appointmentTime={appointmentTime}
              onClick={handleDoctorClick} // Pass the new click handler
              isSelected={doctor.id === selectedDoctorId} // Pass the selected state
            />
          )
        })}
      </ul>
      <button className="book-appointment-btn" onClick={() => save()}>BOOK</button>
      <button className="cancel-appointment-btn" onClick={() => cancel()}>CANCEL</button>
    </div>
  )
}

export default DoctorList;
