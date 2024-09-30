import { useState } from 'react'
import './App.css'
import Appointment from './components/Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import DoctorList from './components/DoctorList/DoctorList'
import useDoctorsData from './hooks/useDoctorsData'
import useApplicationData from './hooks/useApplicationData';
import Schedule from './components/Schedule/Schedule'

function App() {
  const { doctor } = useDoctorsData();

  const { isRecordOpen, patientRecord, openRecordModal, closeRecordModal, isMsgsOpen, patientMsgs, openMsgsModal, closeMsgsModal } = useApplicationData();
  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      {/* <Appointment /> */}
      {/* <DoctorList doctorData={doctor}/>       */}
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

      <Schedule />
      
      <RegistrationForm />
    </>
  )
}

export default App;
