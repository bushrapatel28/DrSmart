import React, { useState } from "react";
import DoctorListItem from "../DoctorListItem/DoctorListItem";

const DoctorList = (props) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State to track selected doctor

  const handleDoctorClick = (id) => {
    setSelectedDoctorId(id); // Update selected doctor ID
    props.saveDoctorInfo(id); // Call the provided click handler
  };

  return (
    <div className="doctors">
      <ul className="doctors-list">
        {props.doctorData.map((doctor) => {
          return (
            <DoctorListItem
              key={doctor.id}
              id={doctor.id}
              doctorName={doctor.name}
              profile={doctor.profile_img}
              specialization={doctor.specialization}
              availability={doctor.availability}
              appointmentDate={props.appointmentDate}
              appointmentTime={props.appointmentTime}
              onClick={handleDoctorClick} // Pass the new click handler
              isSelected={doctor.id === selectedDoctorId} // Pass the selected state
            />
          )
        })}
      </ul>
      <button className="book-appointment-btn" onClick={() => props.save()}>BOOK</button>
      <button className="cancel-appointment-btn" onClick={() => props.cancel()}>CANCEL</button>
    </div>
  )
}

export default DoctorList;
