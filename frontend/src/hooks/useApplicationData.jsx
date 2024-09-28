import {useReducer, useState, useEffect} from 'react';
import  {patients, doctors, records, prescriptions, msgs} from '../mocks/mockData';

const OPEN_RECORD         = 'OPEN_RECORD';
const CLOSE_RECORD        = 'CLOSE_RECORD';
const OPEN_MSGS           = 'OPEN_MSGS';
const CLOSE_MSGS          = 'CLOSE_MSGS';

console.log("All patients records: ", records);
// const SET_PATIENT_RECORD    = 'SET_PATIENT_RECORD';

const reducer = (state, action) => {
  switch(action.type) {
    case OPEN_RECORD:
      console.log("Action.Payload in Open record: ", action.payload);
      const allRecords = records.filter(record => record.patient_id === action.payload.toString());
      console.log("Filtered Recods array: ", allRecords);
      return {
        ...state,
        isRecordOpen: true,
        patientRecord: allRecords
      }
    case CLOSE_RECORD:
      return {
        ...state,
        isRecordOpen: false,
        patientRecord: null
      }
    case OPEN_MSGS:
      console.log("openMsgsModal function is DISPATCHED");
      const allMsgs= msgs.filter(msg => msg.patient_id === action.payload.toString());
      return {
        ...state,
        isMsgsOpen: true,
        patientMsgs: allMsgs
      }
      case CLOSE_MSGS:
        return {
          ...state,
          isMsgsOpen: false,
          patientMsgs: null
        }
  }
}

const initialState = {
  patientRecord: null,
  isRecordOpen: false,
  patientMsgs: null,
  isMsgsOpen: false
}


const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openRecordModal = (user_id) => {
    console.log("User id in open modal fucntion: ", user_id);
    dispatch({type: OPEN_RECORD, payload: user_id});
  }
  const closeRecordModal = () => {
    dispatch({type: CLOSE_RECORD, payload: null});
  }

  const openMsgsModal = (user_id) => {
    console.log("openMsgsModal function is dispatching");
    dispatch({type: OPEN_MSGS, payload: user_id});
  }
  const closeMsgsModal = () => {
    dispatch({type: CLOSE_MSGS, payload: null});
  }

  return {
    isRecordOpen: state.isRecordOpen,
    patientRecord: state.patientRecord,
    openRecordModal,
    closeRecordModal,
    isMsgsOpen: state.isMsgsOpen,
    patientMsgs: state.patientMsgs,
    openMsgsModal,
    closeMsgsModal
  }

};

export default useApplicationData;