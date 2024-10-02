import { useState, useEffect, useReducer } from "react";
const OPEN_SCHEDULER = "OPEN_SCHEDULER";
const CLOSE_SCHEDULER = "CLOSE_SCHEDULER";
const SET_DOCTOR = "SET_DOCTOR"

const reducer = (state, action) => {
  switch(action.type) {
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
      case SET_DOCTOR:
        console.log("Doctor is being set in the dispatch");
        return {
          ...state,
          doctor: action.payload
        }
      
  }
}

const initialState = {
  isSchedulerOpen: false,
  doctor: []
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

  return { 
    doctor: state.doctor,
    isSchedulerOpen: state.isSchedulerOpen,
    openSchedulerModal,
    closeSchedulerModal
  };
}

export default useDoctorsData;