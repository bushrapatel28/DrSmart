import { useEffect, useReducer } from "react";
const OPEN_SCHEDULER = "OPEN_SCHEDULER";
const CLOSE_SCHEDULER = "CLOSE_SCHEDULER";
const SET_DOCTOR = "SET_DOCTOR"
const OPEN_PATIENT_RECORD = "OPEN_PATIENT_RECORD";
const CLOSE_PATIENT_RECORD = "CLOSE_PATIENT_RECORD";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_DOCTOR:
      console.log("Doctor is being set in the dispatch");
      return {
        ...state,
        doctor: action.payload
      };
    case OPEN_SCHEDULER:
      console.log("Open the doctors scheduler");
      return {
        ...state,
        isSchedulerOpen: true
      };
    case CLOSE_SCHEDULER:
      console.log("Close the doctors scheduler");
      return {
        ...state,
        isSchedulerOpen: false
      };
    case OPEN_PATIENT_RECORD:
      return {
        ...state,
        isPatientRecordOpen: true
      };
    case CLOSE_PATIENT_RECORD:
      return {
        ...state,
        isPatientRecordOpen: false
      };      
  }
}

const initialState = {
  isSchedulerOpen: false,
  doctor: [],
  isPatientRecordOpen: false
}


const useDoctorsData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        dispatch({type: SET_DOCTOR, payload: data})
      })
  }, []);

  const openSchedulerModal = (user_id) => {
    console.log("Adding Appointment for user: ", user_id);
    dispatch({type: OPEN_SCHEDULER});
  }

  const closeSchedulerModal = () => {
    dispatch({type: CLOSE_SCHEDULER});

  }

  const openPatientRecordModal = (user_id) => {
    dispatch({type: OPEN_PATIENT_RECORD});
  }

  const closePatientRecordModal = () => {
    dispatch({type: CLOSE_PATIENT_RECORD});

  }

  return { 
    doctor: state.doctor,
    isSchedulerOpen: state.isSchedulerOpen,
    openSchedulerModal,
    closeSchedulerModal,
    isPatientRecordOpen: state.isPatientRecordOpen,
    openPatientRecordModal,
    closePatientRecordModal
  };
}

export default useDoctorsData;