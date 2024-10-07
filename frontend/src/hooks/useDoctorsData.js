import { useEffect, useReducer } from "react";

const OPEN_SCHEDULER         = "OPEN_SCHEDULER";
const CLOSE_SCHEDULER        = "CLOSE_SCHEDULER";
const SET_DOCTOR             = "SET_DOCTOR"
const OPEN_PATIENT_RECORD    = "OPEN_PATIENT_RECORD";
const CLOSE_PATIENT_RECORD   = "CLOSE_PATIENT_RECORD";
const OPEN_VISIT_FORM        = "OPEN_VISIT_FORM";
const CLOSE_VISIT_FORM       = "CLOSE_VISIT_FORM";
const OPEN_DOC_MSGS        = "OPEN_DOC_MSGS";
const CLOSE_DOC_MSGS       = "CLOSE_DOC_MSGS";

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
      case OPEN_VISIT_FORM:
        return {
          ...state,
          isVisitFormOpen: true
        };
      case CLOSE_VISIT_FORM:
        return {
          ...state,
          isVisitFormOpen: false
        };    
        case OPEN_DOC_MSGS:
          return {
            ...state,
            isMsgsOpen: true
          };
        case CLOSE_DOC_MSGS:
          return {
            ...state,
            isMsgsOpen: false
          };     
  }
}

const initialState = {
  isSchedulerOpen: false,
  doctor: [],
  isPatientRecordOpen: false,
  isVisitFormOpen: false,
  isMsgsOpen: false
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

  const openSchedulerModal = (doc_id) => {
    console.log("Adding Appointment for user: ", doc_id);
    dispatch({type: OPEN_SCHEDULER});
  }

  const closeSchedulerModal = () => {
    dispatch({type: CLOSE_SCHEDULER});

  }

  const openPatientRecordModal = (doc_id) => {
    dispatch({type: OPEN_PATIENT_RECORD});
  }

  const closePatientRecordModal = () => {
    dispatch({type: CLOSE_PATIENT_RECORD});

  }

  const openVisitModal = (doc_id) => {
    dispatch({type: OPEN_VISIT_FORM});
  }

  const closeVisitModal = () => {
    dispatch({type: CLOSE_VISIT_FORM});

  }

  const openDocMsgsModal = (doc_id) => {
    console.log("openMsgsModal function is dispatching");

    fetch(`/doctors/${doc_id}/messages`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Requested data from DB: ", data);
        dispatch({ type: OPEN_DOC_MSGS, payload: data });
      })
      .catch(error => {
        console.error("Error fetching messages: ", error);
      });
    }

  const closeDocMsgsModal = () => {
    dispatch({type: CLOSE_DOC_MSGS});

  }
  return { 
    docState: state,
    openSchedulerModal,
    closeSchedulerModal,
    openPatientRecordModal,
    closePatientRecordModal,
    openVisitModal,
    closeVisitModal,
    openDocMsgsModal,
    closeDocMsgsModal
  };
}

export default useDoctorsData;