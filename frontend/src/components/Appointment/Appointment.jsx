import React from "react";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString());

  function save(){
    console.log(`Book ${startDate} ${startTime}`);
  }
  
  function cancel(){
    console.log("Cancel")
  }

  return (
    <div>
      <DatePicker
        inline
        showIcon
        icon="fa fa-calendar"
        selected={startDate} 
        onChange={(date) => {setStartDate(date); setStartTime(date.toLocaleTimeString())}} 
        showTimeSelect
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <form className="appointment-form" onSubmit={event => event.preventDefault()}>
        <input
          readOnly
          name="date"
          className="appointment-date"
          value={`${startDate.toDateString()}`}
        />
        <input
          readOnly
          name="time"
          className="appointment-time"
          value={`${startTime}`}
        />
        <button className="book-appointment" onClick={save}>Book</button>
        <button className="cancel-appointment" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
}

export default Appointment;