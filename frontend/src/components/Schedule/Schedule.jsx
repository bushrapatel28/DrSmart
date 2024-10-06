import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import AvailabilityList from "../AvailabilityList/AvailabilityList"

const Schedule = (props) => {

  return (
    <div>
      <div>
        <DatePicker
          selected={props.docStartDate}
          onChange={props.datesOnChange}
          startDate={props.docStartDate}
          endDate={props.docEndDate}
          selectsRange
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 7)}
          inline
        />
      </div>

      <div className="selected-time-range">
        <h4>Start Time:</h4>
        <DatePicker
          selected={props.docStartTime}
          // onChange={(time) => props.setDocStartTime(time)}
          onChange={props.docStartTimeOnChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setHours(setMinutes(new Date(), 0), 5)}        //Only allow times starting from 6:30 AM (i.e after 6:00 AM)
          maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
          timeCaption="Start Time"
          dateFormat="hh:mm aa"
          className="schedule-time"
        />
      </div>

      <div className="selected-time-range">
        <h4>End Time:</h4>
        <DatePicker
          selected={props.docEndTime}
          // onChange={(time) => props.setDocEndTime(time)}
          onChange={props.docEndTimeOnChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setMinutes(props.docStartTime, 60)}                      //End Time range begins 1 hour after Start Time
          maxTime={setHours(setMinutes(new Date(), 30), 20)}                //Only allow times until 8:30 PM
          timeCaption="End Time"
          dateFormat="hh:mm aa"
          className="schedule-time"
        />
      </div>

      <div>
        <button onClick={props.setAvailability}>ADD</button>
        <button onClick={props.saveSchedule}>SAVE</button>
      </div>

      <AvailabilityList
        selectedRanges={props.selectedRanges}
        deleteAvailability={props.deleteAvailability}
      />

    </div>
  );
}

export default Schedule;