import React from "react";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker
        inline
        showIcon
        icon="fa fa-calendar"
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        showTimeSelect
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        />
    </div>
  );
}

export default Appointment;