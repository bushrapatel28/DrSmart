// import React from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import DoctorList from "../DoctorList/DoctorList";

const Appointment = (props) => {
  // console.log("props in Appointment comp: ", props);
  console.log("STATE in Appointment comp: ", props.state);

  const {
    state:{startDate, startTime, isVirtual, showDoc, errorMsg},
    doctorData,
    saveDoctorInfo,
    selectDateTime,
    toggleAppointmentType,
    next,
    clear,
    save,
    cancel,
    filterPassedTime
  } = props;

  return (
    <>
      {/* <div className="modal">
      <div className="modal__content">
        <button className="modal__close-button" onClick={closeAppointmentModal}>
            <span>&times;</span>
        </button>
        <h3 className="modal__heading">Book Your Appointment</h3> */}
        <div>
          <DatePicker
            inline
            showIcon
            icon="fa fa-calendar"
            selected={startDate && startDate} 
            onChange={(date) => selectDateTime(date)} 
            showTimeSelect
            timeIntervals={30}
            timeCaption="Time"
            filterTime={filterPassedTime}
            dateFormat="hh:mm aa"          //Format for the Time side panel within the calendar
            minDate={new Date()}          // Only allow dates starting from today
            minTime={startDate && startDate.toDateString() === new Date().toDateString()
              ? new Date() > setHours(setMinutes(new Date(), 0), 6) // If today, set minTime to current time or 6:00 AM
                ? new Date()
                : setHours(setMinutes(new Date(), 0), 6)
              : setHours(setMinutes(new Date(), 0), 6)}  // For other dates, set minTime to 6:00 AM
            maxTime={setHours(setMinutes(new Date(), 30), 20)}      //Only allow times until 8:30 PM
            // excludeTimes={excludedTimes}             // Exclude specific times
          />
          
        </div>
        

        <form className="modal__appointment-form" onSubmit={event => event.preventDefault()}>
          <input
            className="modal__appointment-date"
            readOnly
            name="date"
            value={startDate && startDate.toDateString()}
          />
          <input
            className="appointment-time"
            readOnly
            name="time"
            value={startTime && startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}     //Converting time to show local time in string format
          />
          <div className="modal__appointment-btns">
            <button className="next-btn" onClick={next}>NEXT</button>
            <button className="back-btn" onClick={clear}>CLEAR</button>
          </div>

          <div className="error-message">
            <h3 className="appointment-error">{errorMsg}</h3>
          </div>
          {/* {errorMsg && 
          } */}

          <div className="appointment-type">
            <label>
              <input 
                className="in-person"
                type="radio"
                name="in-person"
                value="In-person"
                checked={!isVirtual}
                onChange={() => toggleAppointmentType()}
              />
              In-person
            </label>
            <label>
              <input 
                className="virtual"
                type="radio"
                name="virtual"
                value="Virtual"
                checked={isVirtual}
                onChange={() => toggleAppointmentType()}
              />
              Virtual
            </label>
          </div>
        </form>
        
        {showDoc 
        && <DoctorList 
              doctorData={doctorData} 
              appointmentDate={startDate}
              appointmentTime={startTime}
              saveDoctorInfo={saveDoctorInfo}
              save={save}
              cancel={cancel}
              errorMsg={errorMsg}
          />
        }
      {/* </div>
    </div> */}

    </>
  );
}

export default Appointment;