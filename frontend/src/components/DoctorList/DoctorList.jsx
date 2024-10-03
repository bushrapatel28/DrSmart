import React from "react";
import DoctorListItem from "../DoctorListItem/DoctorListItem";

const DoctorList = (props) => {
  console.log("Props.DocData in the DoctorList: ", props.doctorData);
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
              onClick={props.saveDoctorInfo}
            />
          )
        })}
      </ul>
      <button className="book-appointment-btn" onClick={() => props.save()}>Book</button>
      <button className="cancel-appointment-btn" onClick={() => props.cancel()}>Cancel</button>
    </div>
  )

}

export default DoctorList;