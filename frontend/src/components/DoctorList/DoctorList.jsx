import React from "react";
import DoctorListItem from "../DoctorListItem/DoctorListItem";

const DoctorList = (props) => {
  console.log(props);

  let i = 0;

  return (
    <div>
      <ul className="doctors-list">
        {props.doctorData.map((doctor) => {
          return ( 
            <DoctorListItem 
              id={doctor.id}
              doctorName={doctor.name}
              profile={doctor.profile_img}
              specialization={doctor.specialization}
              availability={doctor.availability}
            />
          )
        })}
      </ul>
    </div>
  )

}

export default DoctorList;