import { useState } from 'react'
import './App.css'
import Appointment from './components/Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import DoctorList from './components/DoctorList/DoctorList'
import useDoctorsData from './hooks/useDoctorsData'
import usePatientData from './hooks/usePatientData';

function App() {
  const { doctor } = useDoctorsData();

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
    closeMedicationsModal,
    isLabResultsOpen,
    patientLabResults,
    openLabResultsModal,
    closeLabResultsModal
 } = usePatientData();
  const [currentComponent, setCurrentComponent] = useState('home');
  console.log("PATIENT LAB RESULTS FROM App.jsx: ", patientLabResults);
  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      <Appointment />
      <DoctorList doctorData={doctor}/>      
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
        isLabResultsOpen={isLabResultsOpen}
        patientLabResults={patientLabResults}
        openLabResultsModal={openLabResultsModal}
        closeLabResultsModal={closeLabResultsModal}
      />

      <RegistrationForm />
    </>
  )
}

export default App
