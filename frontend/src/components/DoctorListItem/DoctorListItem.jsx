import React from "react";

const DoctorListItem = (props) => {
  const {
    id,
    doctorName,
    profile,
    specialization,
    availability
  } = props;

  console.log(`DoctorListItem: ${props.id}`);

  return (
    <div>
      <div className="doctors-list-item">
        <div className="doctor-name">
          {props.doctorName}
        </div>
        <div className="doctor-profile-image">
          <img 
            src={props.profile} 
            alt="Profile-Photo" 
          />
        </div>
      </div>
    </div>
  )

}

export default DoctorListItem;