import React from "react";

const DoctorList = (props) => {
  console.log(props);

  let i = 0;

  return (
    <div>
      <ul className="doctors-list">
        {props.doctorData.map((doc) => {
          return ( <li key={i++}>{doc.name}</li> )
        })}
      </ul>
    </div>
  )

}

export default DoctorList;