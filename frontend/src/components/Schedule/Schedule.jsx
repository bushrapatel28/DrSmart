import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

const Schedule = (props) => {

  return (
    <div>
      <div>
        <DatePicker
          selected={props.docStartDate}
          onChange={props.docOnChange}
          startDate={props.docStartDate}
          endDate={props.docEndDate}
          selectsRange
          minDate={new Date()}
          maxDate={addDays(new Date(), 7)}
          inline
        />
      </div>

      <div>
        Start Time: 
        <DatePicker
          selected={props.docStartTime}
          onChange={(time) => props.setDocStartTime(time)}
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
          selected={props.docEndTime}
          onChange={(time) => props.setDocEndTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setMinutes(props.docStartTime, 60)}                      //End Time range begins 1 hour after Start Time
          maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
          timeCaption="End Time"
          dateFormat="hh:mm aa"
        />
      </div>

      <button onClick={props.setAvailability}>Add</button>
    </div>
  );
}

export default Schedule;