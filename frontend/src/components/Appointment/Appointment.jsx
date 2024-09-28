import React from "react";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  //Initializing the date object instance
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();     //Converting time to show local time in string format

  const [startDate, setStartDate] = useState(currentDate);
  const [startTime, setStartTime] = useState(currentTime);

  function selectDateTime(date) {
    const time = date.toLocaleTimeString();
    setStartDate(date);
    setStartTime(time);
  }
  
  // Exclude specific times based on the selected date
  const excludedTimes = [
    setHours(setMinutes(startDate, 0), 17),  // 5:00 PM
    setHours(setMinutes(startDate, 30), 17), // 5:30 PM
    setHours(setMinutes(startDate, 30), 18), // 6:30 PM
    setHours(setMinutes(startDate, 30), 19), // 7:30 PM
  ];

  function save() {
    console.log(`Book ${startDate} ${startTime}`);
  }
  
  function cancel() {
    console.log("Cancel")
    setStartTime("")
  }

  return (
    <div>
      <DatePicker
        inline
        showIcon
        icon="fa fa-calendar"
        selected={startDate} 
        onChange={(date) => selectDateTime(date)} 
        showTimeSelect
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"          //Format for the Time side panel within the calendar
        minDate={new Date()}          // Only allow dates starting from today
        minTime={setHours(setMinutes(new Date(), 0), 6)}        //Only allow times starting from 6:30 AM (i.e after 6:00 AM)
        maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
        excludeTimes={excludedTimes}             // Exclude specific times
      />

      <form className="appointment-form" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment-date"
          readOnly
          name="date"
          value={startDate.toDateString()}
        />
        <input
          className="appointment-time"
          readOnly
          name="time"
          value={startTime}
        />
        <button className="book-appointment" onClick={save}>Next</button>
        <button className="cancel-appointment" onClick={cancel}>Cancel</button>
      </form>
      
    </div>
  );
}

export default Appointment;