import { useState, useReducer } from 'react';

// const useDoctorsData = () => {
//   const [doctor, setDoctor] = useState([]);

//   useEffect(() => {
//     fetch('/api/doctors')
//       .then(res => res.json())
//       .then(data => setDoctor(data))
//   }, []);

//   return { doctor };
// }

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
  APPOINTMENT_TIME_REMOVED: "APPOINTMENT_TIME_REMOVED"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DOCTOR_ADDED:
      return {...state, doctorInfo: action.payload};
    case ACTIONS.DOCTOR_REMOVED:
      return {...state, };
    case ACTIONS.DISPLAY_DOCTORS_LIST:
      return {...state, };
    case ACTIONS.CLOSE_DOCTORS_LIST:
      return {...state, };
    case ACTIONS.SET_VIRTUAL:
      return {...state, };
    case ACTIONS.SELECT_APPOINTMENT_TYPE:
      return {...state, };
    case ACTIONS.APPOINTMENT_DATE_ADDED:
      return {...state, startDate: action.payload};
    case ACTIONS.APPOINTMENT_DATE_REMOVED:
      return {...state, };
    case ACTIONS.APPOINTMENT_TIME_ADDED:
      return {...state, startTime: action.payload};
    case ACTIONS.APPOINTMENT_TIME_REMOVED:
      return {...state, };
  }
}

const initialState = {
  startDate: "",
  startTime: "",
  isVirtual: true,
  appointmentType: "Virtual",
  showDoc: false,
  doctorInfo: null
}

const useAppointmentData = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isVirtual, setIsVirtual] = useState(true);
  const [appointmentType, setAppointmentType] = useState("Virtual");
  const [showDoc, setShowDoc] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  
  function saveDoctorInfo(selectedDoc) {
    console.log(selectedDoc);
    // setDoctorInfo(selectedDoc);
    dispatch({type: ACTIONS.DOCTOR_ADDED, payload: selectedDoc})
  }
  
  function selectDateTime(selectedDate) {
    // setStartDate(date);
    // setStartTime(date);
    dispatch({type: ACTIONS.APPOINTMENT_DATE_ADDED, payload: selectedDate})
    dispatch({type: ACTIONS.APPOINTMENT_TIME_ADDED, payload: selectedDate})
  }
  
  function toggleAppointmentType() {
    if (state.isVirtual) {
      // setIsVirtual(false);
      // setAppointmentType("In-Person");
      dispatch({type: ACTIONS.SET_VIRTUAL, payload: false})
      dispatch({type: ACTIONS.SELECT_APPOINTMENT_TYPE, payload: "In-Person"})
    } else {
      // setIsVirtual(true);
      // setAppointmentType("Virtual");
      dispatch({type: ACTIONS.SET_VIRTUAL, payload: true})
      dispatch({type: ACTIONS.SELECT_APPOINTMENT_TYPE, payload: "VIRTUAL"})
    }
  }

  //When no selection is made, the showTimeSelect list should only show times after current time until the set end time
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  
  function next() {
    console.log(`Next`);
    setShowDoc(true);
  }
  
  function back() {
    console.log("Back");
    setShowDoc(false);
    setDoctorInfo(null);
    setStartDate("");
    setStartTime("");
  }

  function save() {
    console.log(`Save ${startDate} ${startTime}`);
    setShowDoc(false);
    
    const appointmentData = {
      appointment_date: startDate,
      appointment_time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false}),
      appointment_type: appointmentType,
      status: "Pending",
      patient_id: 1,
      doctor_id: doctorInfo
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
      })
      .catch(error => {
        console.error("Error:", error);  // Handle any errors that occur
      });
  }

  function cancel() {
    console.log("Cancel");
    setDoctorInfo("");
    setShowDoc(false);
  }

  return {
    startDate,
    startTime,
    isVirtual,
    showDoc,
    doctorInfo,
    saveDoctorInfo,
    selectDateTime,
    toggleAppointmentType,
    next,
    back,
    save,
    cancel,
    filterPassedTime
  }
}



export default useAppointmentData;