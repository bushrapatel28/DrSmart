import { useState } from 'react';

// const useDoctorsData = () => {
//   const [doctor, setDoctor] = useState([]);

//   useEffect(() => {
//     fetch('/api/doctors')
//       .then(res => res.json())
//       .then(data => setDoctor(data))
//   }, []);

//   return { doctor };
// }

const useAppointmentData = () => {
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [isVirtual, setIsVirtual] = useState(true);
  const [appointmentType, setAppointmentType] = useState("Virtual");
  const [showDoc, setShowDoc] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  
  function saveDoctorInfo(doc) {
    console.log(doc);
    setDoctorInfo(doc);
  }
  
  function selectDateTime(date) {
    setStartDate(date);
    setStartTime(date);
  }
  
  function toggleAppointment() {
    if (isVirtual) {
      setIsVirtual(false);
      setAppointmentType("In-Person");
    } else {
      setIsVirtual(true);
      setAppointmentType("Virtual");
    }
  }
  
  function next() {
    console.log(`Next`);
    setShowDoc(true);
  }
  
  function back() {
    console.log("Back");
    setShowDoc(false);
  }

  function save() {
    console.log(`Save ${startDate} ${startTime}`);
    setShowDoc(true);
    
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
    toggleAppointment,
    next,
    back,
    save,
    cancel
  }
}



export default useAppointmentData;