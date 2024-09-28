import { useState } from 'react'
import './App.css'
import Appointment from './Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import useApplicationData from './hooks/useApplicationData';

function App() {
  const { isRecordOpen, patientRecord, openRecordModal, closeRecordModal, isMsgsOpen, patientMsgs, openMsgsModal, closeMsgsModal } = useApplicationData();
  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      <Appointment />
      
      <HomePage 
        isRecordOpen={isRecordOpen} 
        patientRecord={patientRecord} 
        openRecordModal={openRecordModal} 
        closeRecordModal={closeRecordModal} 
        isMsgsOpen={isMsgsOpen} 
        patientMsgs={patientMsgs} 
        openMsgsModal={openMsgsModal} 
        closeMsgsModal={closeMsgsModal}
      />

      <RegistrationForm />
    </>
  )
}

export default App
