import { useEffect, useReducer } from "react";
// import appointments from "../../../backend/src/routes/appointments";

const OPEN_SCHEDULER         = "OPEN_SCHEDULER";
const CLOSE_SCHEDULER        = "CLOSE_SCHEDULER";
const SET_DOCTOR             = "SET_DOCTOR";
const OPEN_PATIENTS          = "OPEN_PATIENTS";
const CLOSE_PATIENTS         = "CLOSE_PATIENTS";
const SET_PATIENTS           = "SET_PATIENTS"
const OPEN_VISIT_FORM        = "OPEN_VISIT_FORM";
const CLOSE_VISIT_FORM       = "CLOSE_VISIT_FORM";
const OPEN_ACCEPT_APPT       = "OPEN_ACCEPT_APPT";
const CLOSE_ACCEPT_APPT      = "CLOSE_ACCEPT_APPT";
const UPDATE_APPOINTMENT     = "UPDATE_APPOINTMENT";

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
    case OPEN_ACCEPT_APPT:
      return {
        ...state,
        isAcceptApptOpen: true,
        apptData: action.payload
      };
    case CLOSE_ACCEPT_APPT:
      return {
        ...state,
        isAcceptApptOpen: false
      };
    case UPDATE_APPOINTMENT: 
    console.log("***DISPATCH IS TRIGGERED***", action.payload);
    return {
      ...state,
      apptData: state.apptData.map(appt => 
        appt.id === action.payload.id ? { ...appt, status: action.payload.status } : appt
      ),
    };    
  }
};

const initialState = {
  isSchedulerOpen: false,
  doctor: [],
  isPatientsOpen: false,
  patients: [],
  isVisitFormOpen: false,
  isAcceptApptOpen: false,
  apptData: []
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

  const openSchedulerModal = (doc_id) => {
    // console.log("Adding Appointment for user: ", doc_id);
    dispatch({type: OPEN_SCHEDULER});
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
  const openVisitModal = (doc_id) => {
    dispatch({type: OPEN_VISIT_FORM});
  }
  
  const closeVisitModal = () => {
    dispatch({type: CLOSE_VISIT_FORM});
  
  }
  const openAcceptApptModal = (doc_id) => {
    console.log("** openAcceptApptModal function is dispatching **", doc_id);
  
    fetch(`/api/appointments/${doc_id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Requested APPOINTMENTS DATA from DB: ", data);
        dispatch({ type: OPEN_ACCEPT_APPT, payload: data });
      })
      .catch(error => {
        console.error("Error fetching messages: ", error);
      });
    }
  
  const closeAcceptApptModal = () => {
    dispatch({type: CLOSE_ACCEPT_APPT});
    
  }

  const handleAppt = (apt_id, action) => {
    console.log("Appointment Update Function")
    const post_body = {
      appointment_id: apt_id,
      action: action
    }    
    fetch("/api/appointments/update", {
      method: "POST",                         
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(post_body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Appointment has been Updated", )
      return response.json();  
      })
      .then(data => {
        console.log("Appointment updated:", data);
        dispatch({ type: UPDATE_APPOINTMENT, payload: { id: apt_id, status: `${data.appointment.status}` } });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  return {
    docState: state,
    openPatientsModal,
    closePatientsModal,
    openSchedulerModal,
    closeSchedulerModal,
    openVisitModal,
    closeVisitModal,
    openAcceptApptModal,
    closeAcceptApptModal,
    handleAppt
  };
}

export default useDoctorsData;