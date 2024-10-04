import { useState } from 'react'
import './App.css'
import Appointment from './components/Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import PatientsList from './PatientsList/PatientsList'
import PatientMedicalData from './PatientMedicalData/PatientMedicalData'
// import DoctorList from './components/DoctorList/DoctorList'
import useDoctorsData from './hooks/useDoctorsData'
// import useApplicationData from './hooks/useApplicationData';
import Schedule from './components/Schedule/Schedule'
import useAppointmentData from './hooks/useAppointmentData'
import usePatientData from './hooks/usePatientData';
import DoctorDash from './routes/DoctorDash/DoctorDash'
import useScheduleData from './hooks/useScheduleData'
import useTopNavProfileModal from './hooks/useTopNavProfileModal'

function App() {
  const {
    topNavState,
    openProfile,
    closeProfile,
    openSettings,
    closeSettings
  } = useTopNavProfileModal();

  const {
    docStartDate,
    docEndDate,
    docStartTime,
    docEndTime,
    datesOnChange,
    docStartTimeOnChange,
    docEndTimeOnChange,
    setAvailability,
    timeSlots,
    add,
    saveSchedule
  } = useScheduleData();

  const {
    doctor,
    isSchedulerOpen,
    openSchedulerModal,
    closeSchedulerModal,
    patients,
    isPatientsOpen,
    openPatientsModal,
    closePatientsModal
  } = useDoctorsData();

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
    cancel,
    filterPassedTime
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
    closeMedicationsModal,
    isLabResultsOpen,
    patientLabResults,
    openLabResultsModal,
    closeLabResultsModal,
    isAppointmentOpen,
    openAppointmentModal,
    closeAppointmentModal,
    isMedicalHistoryOpen,
    openMedicalHistoryModal,
    closeMedicalHistoryModal
  } = usePatientData();

  const [currentComponent, setCurrentComponent] = useState('home');
  console.log("PATIENT LAB RESULTS FROM App.jsx: ", patientLabResults);
  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      {/* <Appointment /> */}
      {/* <DoctorList doctorData={doctor}/>       */}


      <HomePage
        /*TopNav Props*/
        topNavState={topNavState}
        openProfile={openProfile}
        closeProfile={closeProfile}
        openSettings={openSettings}
        closeSettings={closeSettings}
        /*TopNav Props End*/
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
        isAppointmentOpen={isAppointmentOpen}
        openAppointmentModal={openAppointmentModal}
        closeAppointmentModal={closeAppointmentModal}
        isMedicalHistoryOpen={isMedicalHistoryOpen}
        openMedicalHistoryModal={openMedicalHistoryModal}
        closeMedicalHistoryModal={closeMedicalHistoryModal}
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
        filterPassedTime={filterPassedTime}
      />
      <DoctorDash
        isSchedulerOpen={isSchedulerOpen}
        openSchedulerModal={openSchedulerModal}
        closeSchedulerModal={closeSchedulerModal}
        docStartDate={docStartDate}
        docEndDate={docEndDate}
        docStartTime={docStartTime}
        docEndTime={docEndTime}
        datesOnChange={datesOnChange}
        docStartTimeOnChange={docStartTimeOnChange}
        docEndTimeOnChange={docEndTimeOnChange}
        setAvailability={setAvailability}
        saveSchedule={saveSchedule}
        // Patients props
        patients={patients}
        isPatientsOpen={isPatientsOpen}
        openPatientsModal={openPatientsModal}
        closePatientsModal={closePatientsModal}
      />
      {/* <DoctorDash /> */}
      {/* <RegistrationForm /> */}
      {/* <Appointment
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
        filterPassedTime={filterPassedTime}
      /> */}
      <Schedule
        docStartDate={docStartDate}
        docEndDate={docEndDate}
        docStartTime={docStartTime}
        docEndTime={docEndTime}
        datesOnChange={datesOnChange}
        docStartTimeOnChange={docStartTimeOnChange}
        docEndTimeOnChange={docEndTimeOnChange}
        setAvailability={setAvailability}
        saveSchedule={saveSchedule}
      />

    </>
  )
}

export default App;
