import { useState, useEffect, useReducer } from "react";
const OPEN_SCHEDULER = "OPEN_SCHEDULER";
const CLOSE_SCHEDULER = "CLOSE_SCHEDULER";
const SET_DOCTOR = "SET_DOCTOR"
const OPEN_PATIENTS = "OPEN_PATIENTS";
const CLOSE_PATIENTS = "CLOSE_PATIENTS";
const SET_PATIENTS = "SET_PATIENTS"

const reducer = (state, action) => {
  switch (action.type) {
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
    case OPEN_PATIENTS:
      return {
        ...state,
        isPatientsOpen: true
      };
    case CLOSE_PATIENTS:
      return {
        ...state,
        isPatientsOpen: false
      };
    case SET_PATIENTS:
      return {
        ...state,
        patients: action.payload
      }

  }
};

const initialState = {
  isSchedulerOpen: false,
  doctor: [],
  isPatientsOpen: false,
  patients: []
};

const useDoctorsData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: SET_DOCTOR, payload: data })
      })
  }, []);

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: SET_PATIENTS, payload: data })
      })
  }, []);

  const openSchedulerModal = (user_id) => {
    console.log("Adding Appointment for user: ", user_id);
    dispatch({ type: OPEN_SCHEDULER });
  }

  const closeSchedulerModal = () => {
    dispatch({ type: CLOSE_SCHEDULER });
  }

  const openPatientsModal = () => {
    dispatch({ type: OPEN_PATIENTS });
  }

  const closePatientsModal = () => {
    dispatch({ type: CLOSE_PATIENTS });
  }

  return {
    doctor: state.doctor,
    isSchedulerOpen: state.isSchedulerOpen,
    openSchedulerModal,
    closeSchedulerModal,
    patients: state.patients,
    isPatientsOpen: state.isPatientsOpen,
    openPatientsModal,
    closePatientsModal
  };
}

export default useDoctorsData;