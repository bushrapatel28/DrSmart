import React from "react";
import { useState } from "react";
import DoctorListItem from "../DoctorListItem/DoctorListItem";

const DoctorList = (props) => {
  const [doctorInfo, setDoctorInfo] = useState("");

  function onClick(doc) {
    setDoctorInfo(doc);
  }

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
              onClick={onClick}
            />
          )
        })}
      </ul>
      <button className="book-btn" onClick={() => console.log(doctorInfo)}>Book</button>
    </div>
  )

}

export default DoctorList;