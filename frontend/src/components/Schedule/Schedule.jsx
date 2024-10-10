import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import AvailabilityList from "../AvailabilityList/AvailabilityList"

const Schedule = (props) => {

  const {
    schedulerState: {docStartDate, docEndDate, docStartTime, docEndTime, selectedRanges},
    datesOnChange,
    docStartTimeOnChange,
    docEndTimeOnChange,
    setAvailability,
    saveSchedule,
    deleteAvailability
  } = props;

  return (
    <div>
      <div>
        <DatePicker
          selected={docStartDate}
          onChange={datesOnChange}
          startDate={docStartDate}
          endDate={docEndDate}
          selectsRange
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 7)}
          inline
        />
      </div>

      <div className="selected-time-range">
        <h4>Start Time:</h4>
        <DatePicker
          selected={docStartTime}
          // onChange={(time) => setDocStartTime(time)}
          onChange={docStartTimeOnChange}
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
          selected={docEndTime}
          // onChange={(time) => setDocEndTime(time)}
          onChange={docEndTimeOnChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          minTime={setMinutes(docStartTime, 60)}                      //End Time range begins 1 hour after Start Time
          maxTime={setHours(setMinutes(new Date(), 30), 20)}                //Only allow times until 8:30 PM
          timeCaption="End Time"
          dateFormat="hh:mm aa"
          className="schedule-time"
        />
      </div>

      <div>
        <button onClick={setAvailability}>ADD</button>
        <button onClick={saveSchedule}>SAVE</button>
      </div>

      <AvailabilityList
        selectedRanges={selectedRanges}
        deleteAvailability={deleteAvailability}
      />

    </div>
  );
}

export default Schedule;