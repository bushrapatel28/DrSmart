import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { addDays } from 'date-fns';

const Schedule = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [timeRange, setTimeRange] = useState([{}]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  
  function setAvailability() {
    setTimeRange((prev) => [...prev, {"start_time": startTime, "end_time": endTime}]);
  }

  // Use useEffect to log the updated timeRange after it changes
  useEffect(() => {
    console.log(timeRange);
  }, [timeRange]);

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={new Date()}
          maxDate={addDays(new Date(), 7)}
          inline
        />
      </div>

      <div>
        Start Time: 
        <DatePicker
          selected={startTime}
          onChange={(time) => setStartTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setHours(setMinutes(new Date(), 0), 6)}        //Only allow times starting from 6:30 AM (i.e after 6:00 AM)
          maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
          timeCaption="Start Time"
          dateFormat="hh:mm aa"
        />
      </div>

      <div>
        End Time: 
        <DatePicker
          selected={endTime}
          onChange={(time) => setEndTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setMinutes(startTime, 60)}                      //End Time range begins 1 hour after Start Time
          maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
          timeCaption="End Time"
          dateFormat="hh:mm aa"
        />
      </div>

      <button onClick={setAvailability}>Add</button>
    </div>
  );
}

export default Schedule;