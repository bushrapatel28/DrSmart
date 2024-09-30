import React from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import DoctorList from "../DoctorList/DoctorList";

const Appointment = (props) => {


  return (
    <div>
      <DatePicker
        inline
        showIcon
        icon="fa fa-calendar"
        selected={props.startDate} 
        onChange={(date) => props.selectDateTime(date)} 
        showTimeSelect
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="hh:mm aa"          //Format for the Time side panel within the calendar
        minDate={new Date()}          // Only allow dates starting from today
        minTime={setHours(setMinutes(new Date(), 0), 6)}        //Only allow times starting from 6:30 AM (i.e after 6:00 AM)
        maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
        // excludeTimes={excludedTimes}             // Exclude specific times
      />

      <form className="appointment-form" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment-date"
          readOnly
          name="date"
          value={props.startDate.toDateString()}
        />
        <input
          className="appointment-time"
          readOnly
          name="time"
          value={props.startTime.toLocaleTimeString()}     //Converting time to show local time in string format
        />
        <div className="appointment-btns">
          <button className="next-btn" onClick={props.next}>Next</button>
          <button className="back-btn" onClick={props.back}>Back</button>
        </div>

        <div className="appointment-type">
          <label>
            <input 
              className="in-person"
              type="radio"
              name="in-person"
              value="In-person"
              checked={!props.isVirtual}
              onChange={() => props.toggleAppointment()}
            />
            In-person
          </label>
          <label>
            <input 
              className="virtual"
              type="radio"
              name="virtual"
              value="Virtual"
              checked={props.isVirtual}
              onChange={() => props.toggleAppointment()}
            />
            Virtual
          </label>
        </div>
      </form>
      
      {props.showDoc 
      && <DoctorList 
            doctorData={props.doctorData} 
            appointmentDate={props.startDate}
            appointmentTime={props.startTime}
            saveDoctorInfo={props.saveDoctorInfo}
            save={props.save}
            cancel={props.cancel}
         />
      }
    </div>
  );
}

export default Appointment;