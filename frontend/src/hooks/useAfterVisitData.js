import { useReducer, useEffect, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: ''
        }
      };

    case 'SET_DATE_TIME': 
      return {
        ...state,
        appointmentDateTime: action.value,
        errors: {
          ...state.errors,
          appointmentDateTime: ''
        }
      };

    case 'VALIDATE_FORM':
      const errorsObj = {};
      if (!state.appointmentDateTime) errorsObj.appointmentDateTime = 'Date & time is required.';
      if (!state.patientId) errorsObj.patientId = 'Patient selection is required.';
      if (!state.diagnosis) errorsObj.diagnosis = 'Diagnosis is required.';
      if (!state.medicine || !state.dosage) errorsObj.prescription = 'Prescription is incomplete.';

      return {
        ...state,
        errors: errorsObj
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
};

const initialState = {
  appointmentDateTime: null,
  patientId: '',
  diagnosis: '',
  tests: '',
  medicine: '',
  dosage: '',
  errors: {},
};

const useAfterVisitData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [patients, setPatients] = useState([]);
  const [submitted, setSubmitted] = useState(false); // New state for submission tracking

  // Fetch patients from the backend
  useEffect(() => {
    fetch('/api/patients')  // Adjust the endpoint to your backend route
      .then(res => res.json())
      .then(data => {
        console.log("*****Patient's data from api: ****", data);
        setPatients(data);
      })
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark as submitted when the form is submitted
    dispatch({ type: 'VALIDATE_FORM' });
  };

  // Detect validation result
  useEffect(() => {
    if (submitted && Object.keys(state.errors).length === 0) {
            // Convert from local time to Toronto time
      // const localDateTime = new Date(state.appointmentDateTime);
      // const torontoDateTime = localDateTime.toLocaleString("en-US", { timeZone: "America/Toronto" });

      // // Extract date and time
      // const appointmentDate = new Date(torontoDateTime).toLocaleDateString('en-CA'); // "YYYY-MM-DD"
      // const appointmentTime = new Date(torontoDateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // "HH:mm"

      const appointmentDate = new Date(state.appointmentDateTime).toLocaleDateString('en-CA'); // "YYYY-MM-DD"
      const appointmentTime = new Date(state.appointmentDateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // "HH:mm"
  
    
      const combinedDiagnosis = `${state.diagnosis} | ${state.tests}`;
      const dataToSend = {
        appointmentDate,
        appointmentTime,
        patientId: state.patientId,
        combinedDiagnosis,
        prescription: {
          medicine: state.medicine,
          dosage: state.dosage,
        },
      };

      console.log('Form submitted with data:', dataToSend);
      //hard coded doctors id
      fetch('/doctors/4/visit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Record created for the appointment:', data);
          dispatch({ type: 'RESET_FORM' });
        })
        .catch((error) => {
          console.error('Error creating record:', error);
        });
    } else {
      console.log('Form has validation errors:', state.errors);
    }

    if (submitted) {
      setSubmitted(false);
    }
  }, [state.errors, submitted]); 

  const selectDateTime = (date) => {

    dispatch({ type: 'SET_DATE_TIME', value: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  console.log("*****Patient's in HOOK: ****", patients);
  return { formData: state, handleInputChange, handleSubmit, selectDateTime, filterPassedTime, patients };
};

export default useAfterVisitData;
