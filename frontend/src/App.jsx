import { useState } from 'react'
import './App.css'
import Appointment from './components/Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import PatientsList from './PatientsList/PatientsList'
import PatientMedicalData from './PatientMedicalData/PatientMedicalData'
// import DoctorList from './components/DoctorList/DoctorList'
import useDoctorsData from './hooks/useDoctorsData'
<<<<<<< HEAD
import useApplicationData from './hooks/useApplicationData';
import Schedule from './components/Schedule/Schedule'
=======
import useAppointmentData from './hooks/useAppointmentData'
import usePatientData from './hooks/usePatientData';
>>>>>>> main

function App() {
  const { doctor } = useDoctorsData();
  const { 
    startDate,
    startTime,
    isVirtual,
    showDoc,
    saveDoctorInfo,
    selectDateTime,
    toggleAppointment,
    next,
    back,
    save,
    cancel
  } = useAppointmentData();

  const { 
    isRecordOpen, 
    patientRecord, 
    openRecordModal, 
    closeRecordModal, 
    isMsgsOpen, 
    patientMsgs, 
    openMsgsModal, 
    closeMsgsModal,
    isMedicationOpen,
    patientMedications,
    openMedicationsModal,
    closeMedicationsModal
 } = usePatientData();
 
  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      {/* <Appointment /> */}
      {/* <DoctorList doctorData={doctor}/>       */}
      <RegistrationForm />
      <PatientsList />
      <PatientMedicalData />
      
      <HomePage 
        isRecordOpen={isRecordOpen} 
        patientRecord={patientRecord} 
        openRecordModal={openRecordModal} 
        closeRecordModal={closeRecordModal} 
        isMsgsOpen={isMsgsOpen} 
        patientMsgs={patientMsgs} 
        openMsgsModal={openMsgsModal} 
        closeMsgsModal={closeMsgsModal}
        isMedicationOpen={isMedicationOpen}
        patientMedications={patientMedications}
        openMedicationsModal={openMedicationsModal}
        closeMedicationsModal={closeMedicationsModal}
      />

      <Schedule />
      
      <Appointment 
        doctorData={doctor} 
        startDate={startDate}
        startTime={startTime}
        isVirtual={isVirtual}
        showDoc={showDoc}
        saveDoctorInfo={saveDoctorInfo}
        selectDateTime={selectDateTime}
        toggleAppointment={toggleAppointment}
        next={next}
        back={back}
        save={save}
        cancel={cancel}
      />
    </>
  )
}

export default App;
