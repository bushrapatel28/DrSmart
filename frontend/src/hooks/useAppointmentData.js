import { useState, useReducer } from 'react';

export const ACTIONS = {
  DOCTOR_ADDED: "DOCTOR_ADDED",
  DOCTOR_REMOVED: "DOCTOR_REMOVED",
  DISPLAY_DOCTORS_LIST: "DISPLAY_DOCTORS_LIST",
  CLOSE_DOCTORS_LIST: "CLOSE_DOCTORS_LIST",
  SET_VIRTUAL: "SET_VIRTUAL",
  SELECT_APPOINTMENT_TYPE: "SELECT_APPOINTMENT_TYPE",
  APPOINTMENT_DATE_ADDED: "APPOINTMENT_DATE_ADDED",
  APPOINTMENT_DATE_REMOVED: "APPOINTMENT_DATE_REMOVED",
  APPOINTMENT_TIME_ADDED: "APPOINTMENT_TIME_ADDED",
  APPOINTMENT_TIME_REMOVED: "APPOINTMENT_TIME_REMOVED",
  DISPLAY_ERROR: "DISPLAY_ERROR",
  HIDE_ERROR: "HIDE_ERROR"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DOCTOR_ADDED:
      return {...state, doctorInfo: action.payload};
    case ACTIONS.DOCTOR_REMOVED:
      return {...state, doctorInfo: null};
    case ACTIONS.DISPLAY_DOCTORS_LIST:
      return {...state, showDoc: true};
    case ACTIONS.CLOSE_DOCTORS_LIST:
      return {...state, showDoc: false};
    case ACTIONS.SET_VIRTUAL:
      return {...state, isVirtual: action.payload};
    case ACTIONS.SELECT_APPOINTMENT_TYPE:
      return {...state, appointmentType: action.payload};
    case ACTIONS.APPOINTMENT_DATE_ADDED:
      return {...state, startDate: action.payload};
    case ACTIONS.APPOINTMENT_DATE_REMOVED:
      return {...state, startDate: ""};
    case ACTIONS.APPOINTMENT_TIME_ADDED:
      return {...state, startTime: action.payload};
    case ACTIONS.APPOINTMENT_TIME_REMOVED:
      return {...state, startTime: ""};
    case ACTIONS.DISPLAY_ERROR:
      return {...state, hasError: true};
    case ACTIONS.HIDE_ERROR:
      return {...state, hasError: false};
    default: 
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

const initialState = {
  startDate: "",
  startTime: "",
  isVirtual: true,
  appointmentType: "Virtual",
  showDoc: false,
  doctorInfo: null,
  hasError: false
}

const useAppointmentData = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [startDate, setStartDate] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [isVirtual, setIsVirtual] = useState(true);
  // const [appointmentType, setAppointmentType] = useState("Virtual");
  // const [showDoc, setShowDoc] = useState(false);
  // const [doctorInfo, setDoctorInfo] = useState(null);


  //When no selection is made, the showTimeSelect list should only show times after current time until the set end time
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  
  function saveDoctorInfo(selectedDoc) {
    console.log(selectedDoc);
    // setDoctorInfo(selectedDoc);
    dispatch({type: ACTIONS.DOCTOR_ADDED, payload: selectedDoc});
    dispatch({type: ACTIONS.HIDE_ERROR});
  }
  
  function selectDateTime(selectedDate) {
    // setStartDate(date);
    // setStartTime(date);
    dispatch({type: ACTIONS.APPOINTMENT_DATE_ADDED, payload: selectedDate});
    dispatch({type: ACTIONS.APPOINTMENT_TIME_ADDED, payload: selectedDate});
    dispatch({type: ACTIONS.HIDE_ERROR});
  }
  
  function toggleAppointmentType() {
    if (state.isVirtual) {
      // setIsVirtual(false);
      // setAppointmentType("In-Person");
      dispatch({type: ACTIONS.SET_VIRTUAL, payload: false});
      dispatch({type: ACTIONS.SELECT_APPOINTMENT_TYPE, payload: "In-Person"});
    } else {
      // setIsVirtual(true);
      // setAppointmentType("Virtual");
      dispatch({type: ACTIONS.SET_VIRTUAL, payload: true});
      dispatch({type: ACTIONS.SELECT_APPOINTMENT_TYPE, payload: "VIRTUAL"});
    }
  }
  
  function next() {
    console.log(`Next`);
    if(!state.startDate || !state.startTime) {
      console.log("PLEASE SELECT AN APPOINTMENT DATE AND TIME");
      dispatch({type: ACTIONS.DISPLAY_ERROR});
    } else {
      // setShowDoc(true);
      dispatch({type: ACTIONS.DISPLAY_DOCTORS_LIST});
    }
  }
  
  function clear() {
    console.log("Back");
    // setShowDoc(false);
    // setDoctorInfo(null);
    // setStartDate("");
    // setStartTime("");
    dispatch({type: ACTIONS.CLOSE_DOCTORS_LIST});
    dispatch({type: ACTIONS.DOCTOR_REMOVED});
    dispatch({type: ACTIONS.APPOINTMENT_DATE_REMOVED});
    dispatch({type: ACTIONS.APPOINTMENT_TIME_REMOVED});
    dispatch({type: ACTIONS.HIDE_ERROR});
  }
  
  function save() {
    console.log(`Save ${state.startDate} ${state.startTime}`);
    // setShowDoc(false);
    if(!state.doctorInfo) {
      dispatch({type: ACTIONS.DISPLAY_ERROR});
    } else {

      const appointmentData = {
        appointment_date: state.startDate,
        appointment_time: state.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false}),
        appointment_type: state.appointmentType,
        status: "Pending",
        patient_id: 1,
        doctor_id: state.doctorInfo
      };
  
      fetch("/api/appointments/new", {
        method: "POST",                         // Set method to POST
        headers: {
          "Content-Type": "application/json",  // Specify the content type as JSON
        },
        body: JSON.stringify(appointmentData)  // Convert the data to JSON format
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();          // Parse the JSON response
        })
        .then(data => {
          console.log("Appointment created:", data);  // Handle the success response
          dispatch({type: ACTIONS.CLOSE_DOCTORS_LIST});
          dispatch({type: ACTIONS.APPOINTMENT_DATE_REMOVED});
          dispatch({type: ACTIONS.APPOINTMENT_TIME_REMOVED});
          dispatch({type: ACTIONS.DOCTOR_REMOVED});
        })
        .catch(error => {
          console.error("Error:", error);  // Handle any errors that occur
        });
    }
  }
  
  function cancel() {
    console.log("Cancel");
    // setDoctorInfo("");
    // setShowDoc(false);
    dispatch({type: ACTIONS.DOCTOR_REMOVED});
    dispatch({type: ACTIONS.CLOSE_DOCTORS_LIST});
  }
    
  return {
    state,
    // startDate,
    // startTime,
    // isVirtual,
    // showDoc,
    saveDoctorInfo,
    selectDateTime,
    toggleAppointmentType,
    next,
    clear,
    save,
    cancel,
    filterPassedTime
  }
}

export default useAppointmentData;