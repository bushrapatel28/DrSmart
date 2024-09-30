import { useState } from 'react'
import './App.css'
import Appointment from './components/Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import useDoctorsData from './hooks/useDoctorsData'
import useApplicationData from './hooks/useApplicationData';
import useAppointmentData from './hooks/useAppointmentData'

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

  const { isRecordOpen, patientRecord, openRecordModal, closeRecordModal, isMsgsOpen, patientMsgs, openMsgsModal, closeMsgsModal } = useApplicationData();
  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
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
