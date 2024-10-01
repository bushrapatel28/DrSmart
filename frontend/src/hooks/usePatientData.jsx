import {useReducer, useState, useEffect} from 'react';
// import  {patients, doctors, records, prescriptions, msgs} from '../mocks/mockData';

const OPEN_RECORD         = 'OPEN_RECORD';
const CLOSE_RECORD        = 'CLOSE_RECORD';
const OPEN_MSGS           = 'OPEN_MSGS';
const CLOSE_MSGS          = 'CLOSE_MSGS';
const OPEN_MEDICATIONS    = 'OPEN_MEDICATIONS';
const CLOSE_MEDICATIONS   = 'CLOSE_MEDICATIONS';
const OPEN_LABRESULTS    = 'OPEN_LABRESULTS';
const CLOSE_LABRESULTS   = 'CLOSE_LABRESULTS';

// const SET_PATIENT_RECORD    = 'SET_PATIENT_RECORD';

const reducer = (state, action) => {
  switch(action.type) {
    case OPEN_RECORD:
      console.log("PATIENT RECORD FROM DISPATCH: ", action.payload);
      return {
        ...state,
        isRecordOpen: true,
        patientRecord: action.payload
      };
    case CLOSE_RECORD:
      return {
        ...state,
        isRecordOpen: false,
        patientRecord: null
      }
    case OPEN_MSGS:
      console.log("PATIENT MSGS FROM DISPATCH: ", action.payload);
      return {
        ...state,
        isMsgsOpen: true,
        patientMsgs: action.payload
      };
      case CLOSE_MSGS:
        return {
          ...state,
          isMsgsOpen: false,
          patientMsgs: null
        }
      case OPEN_MEDICATIONS:
        console.log("PATIENT MEDICATIONS FROM DISPATCH: ", action.payload);
        return {
          ...state,
          isMedicationOpen: true,
          patientMedications: action.payload
        };
      case CLOSE_MEDICATIONS:
        return {
          ...state,
          isMedicationOpen: false,
          patientMedications: null
        }
        case OPEN_LABRESULTS:
          console.log(" ======= PATIENT LAB RESULTS FROM DISPATCH: ", action.payload);
          return {
            ...state,
            isLabResultsOpen: true,
            patientLabResults: action.payload
          };
        case CLOSE_LABRESULTS:
          return {
            ...state,
            isLabResultsOpen: false,
            patientLabResults: null
          }
  }
}

const initialState = {
  patientRecord: null,
  isRecordOpen: false,
  patientMsgs: null,
  isMsgsOpen: false,
  isMedicationOpen: false,
  patientMedications: null,
  isLabResultsOpen: false,
  patientLabResults: null
}


const usePatientData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const openRecordModal = (user_id) => {
    fetch(`/patient/${user_id}/visits`) 
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("Requested data from DB: ", data);
      dispatch({ type: OPEN_RECORD, payload: data });
    })
    .catch(error => {
      console.error("Error fetching visits: ", error);
    });

    // console.log("User id in open modal fucntion: ", user_id);
    // dispatch({type: OPEN_RECORD, payload: user_id});
  }
  const closeRecordModal = () => {
    dispatch({type: CLOSE_RECORD, payload: null});
  }

  const openMsgsModal = (user_id) => {
    console.log("openMsgsModal function is dispatching");
  
    fetch(`/patient/${user_id}/messages`) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Requested data from DB: ", data);
        dispatch({ type: OPEN_MSGS, payload: data }); 
      })
      .catch(error => {
        console.error("Error fetching messages: ", error);
      });
  }
  
  const closeMsgsModal = () => {
    dispatch({type: CLOSE_MSGS, payload: null});
  }
  const openMedicationsModal = (user_id) => {
    console.log("openMedicationsModal function is dispatching");
  
    fetch(`/patient/${user_id}/medications`) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Requested data from DB: ", data);
        dispatch({ type: OPEN_MEDICATIONS, payload: data }); 
      })
      .catch(error => {
        console.error("Error fetching Medications: ", error);
      });
  }
  
  const closeMedicationsModal = () => {
    dispatch({type: CLOSE_MEDICATIONS, payload: null});
  }
  const openLabResultsModal = (user_id) => {
    console.log("openLabResultsModal function is dispatching");
  
    fetch(`/patient/${user_id}/lab-results`) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Requested data from DB: ", data);
        dispatch({ type: OPEN_LABRESULTS, payload: data }); 
      })
      .catch(error => {
        console.error("Error fetching Lab Results: ", error);
      });
  }
  
  const closeLabResultsModal = () => {
    dispatch({type: CLOSE_LABRESULTS, payload: null});
  }
  console.log("******* Lab results alive: ", state.patientLabResults);
  return {
    isRecordOpen: state.isRecordOpen,
    patientRecord: state.patientRecord,
    openRecordModal,
    closeRecordModal,
    isMsgsOpen: state.isMsgsOpen,
    patientMsgs: state.patientMsgs,
    openMsgsModal,
    closeMsgsModal,
    isMedicationOpen: state.isMedicationOpen,
    patientMedications: state.patientMedications,
    openMedicationsModal,
    closeMedicationsModal,
    isLabResultsOpen: state.isLabResultsOpen,
    patientLabResults: state.patientLabResults,
    openLabResultsModal,
    closeLabResultsModal
  }

};

export default usePatientData;