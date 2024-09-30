import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

const Schedule = () => {
  const [startDate, setStartDate] = useState(new Date());

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
        dateFormat="hh:mm aa"          //Format for the Time side panel within the calendar
        minDate={new Date()}          // Only allow dates starting from today
        minTime={setHours(setMinutes(new Date(), 0), 6)}        //Only allow times starting from 6:30 AM (i.e after 6:00 AM)
        maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
        // excludeTimes={excludedTimes}             // Exclude specific times
      />
    </div>
  );
}

export default Schedule;