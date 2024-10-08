import { useCallback, useState } from 'react'
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
import useRegistrationData from './hooks/useRegistrationData'
import SelectDashboard from './routes/SelectDashboard/SelectDashboard'
import useDashboardData from './hooks/useDashboardData'


function App() {

  const {
    dashboard,
    setDashboard,
    isDashboardSelected,
    setIsDashboardSelected,
    dashboardOnClick
  } = useDashboardData();

  const {
    topNavState,
    openProfile,
    closeProfile,
    openSettings,
    closeSettings
  } = useTopNavProfileModal();

  const {
    schedulerState,
    // docStartDate,
    // docEndDate,
    // docStartTime,
    // docEndTime,
    datesOnChange,
    docStartTimeOnChange,
    docEndTimeOnChange,
    setAvailability,
    saveSchedule,
    // selectedRanges,
    deleteAvailability,
    clearSchedule
  } = useScheduleData();

  const {
    docState,
    openSchedulerModal,
    closeSchedulerModal,
    openPatientsModal,
    closePatientsModal,
    openVisitModal,
    closeVisitModal,
    openAcceptApptModal,
    closeAcceptApptModal,
    handleAppt
  } = useDoctorsData();

  const {
    state,
    // startDate, 
    // startTime, 
    // isVirtual, 
    // showDoc,
    saveDoctorInfo,
    selectDateTime,
    toggleAppointmentType,
    next,
    clear,
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

  const { formData } = useRegistrationData();

  const [currentComponent, setCurrentComponent] = useState('home');
  // console.log("PATIENT LAB RESULTS FROM App.jsx: ", patientLabResults);
  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      {/* <Appointment /> */}
      {/* <DoctorList doctorData={doctor}/>       */}

      {!isDashboardSelected && 
        <SelectDashboard dashboardOnClick={dashboardOnClick} />
      }

      {dashboard === 'patients' &&
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
          /*Appointment Props Start */
          state={state}
          doctorData={docState.doctor}
          // startDate={startDate}
          // startTime={startTime}
          // isVirtual={isVirtual}
          // showDoc={showDoc}
          saveDoctorInfo={saveDoctorInfo}
          selectDateTime={selectDateTime}
          toggleAppointmentType={toggleAppointmentType}
          next={next}
          clear={clear}
          save={save}
          cancel={cancel}
          filterPassedTime={filterPassedTime}
        />
      }

      {dashboard === 'doctors' &&
        <DoctorDash
          state={docState}
          openSchedulerModal={openSchedulerModal}
          closeSchedulerModal={closeSchedulerModal}
          openVisitModal={openVisitModal}
          closeVisitModal={closeVisitModal}
          openAcceptApptModal={openAcceptApptModal}
          closeAcceptApptModal={closeAcceptApptModal}
          //Accept Appt functions
          handleAppt={handleAppt}
          schedulerState={schedulerState}
          // docStartDate={docStartDate}
          // docEndDate={docEndDate}
          // docStartTime={docStartTime}
          // docEndTime={docEndTime}
          datesOnChange={datesOnChange}
          docStartTimeOnChange={docStartTimeOnChange}
          docEndTimeOnChange={docEndTimeOnChange}
          setAvailability={setAvailability}
          saveSchedule={saveSchedule}
          // selectedRanges={selectedRanges}
          deleteAvailability={deleteAvailability}
          clearSchedule={clearSchedule}
          // Patients props
          patients={docState.patients}
          isPatientsOpen={docState.isPatientsOpen}
          openPatientsModal={openPatientsModal}
          closePatientsModal={closePatientsModal}
        />
      }
    </>
  )
}

export default App;
