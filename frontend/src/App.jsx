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

//Zoom Setup
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { message } from 'antd';
import ZoomVideo from '@zoom/videosdk';
import ZoomContext from './context/zoom-context';
import MediaContext from './context/media-context';
import LoadingLayout from './components/LoadingLayout/LoadingLayout'
import VideoContainer from './feature/Video/Video';
import Home from './feature/Home/Home'

function App(props) {

  //Destructure props object
  const {
    meetingArgs: { sdkKey, topic, signature, name, passWord }
  } = props;

  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(' ');
  const [mediaStream, setMediaStream] = useState();
  const [status, setStatus] = useState(false);

  //Use useContext hook to grab passed down value and create client variable
  const client = useContext(ZoomContext);

  useEffect(() => {
    //Create init async function with try...catch block
    const init = async () => {
      console.log("CLIENT", client);

      client.init('US-EN', 'CDN')

      console.log("JOINING MEETING", props);
      
      // console.log("CLIENT JOIN", client.join(topic, signature, name, passWord));
    
      try {
        setLoadingText('Joining Session..')
        await client.join(topic, signature, name, passWord);
        console.log("MEDIA STREAM", client.getMediaStream());

        const stream = client.getMediaStream();
        
        setMediaStream(stream);
        setIsLoading(false);
      }
      catch(err) {
        console.log('Error Joining Meeting', err);
        setIsLoading(false);
        message.error(err.reason);
      }
    }
    //Call function and create clean up functionality
      init();
      return () => {
        ZoomVideo.destroyClient();
    }
  }, [sdkKey, signature, client, topic, name, passWord])


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
    saveSchedule,
    selectedRanges,
    deleteAvailability
  } = useScheduleData();

  const {
    docState,
    openSchedulerModal,
    closeSchedulerModal,
    openPatientsModal,
    closePatientsModal,
    openVisitModal,
    closeVisitModal,
    openDocMsgsModal,
    closeDocMsgsModal
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
      <DoctorDash
        state={docState}
        openSchedulerModal={openSchedulerModal}
        closeSchedulerModal={closeSchedulerModal}
        openVisitModal={openVisitModal}
        closeVisitModal={closeVisitModal}
        openDocMsgsModal={openDocMsgsModal}
        closeDocMsgsModal={closeDocMsgsModal}
        docStartDate={docStartDate}
        docEndDate={docEndDate}
        docStartTime={docStartTime}
        docEndTime={docEndTime}
        datesOnChange={datesOnChange}
        docStartTimeOnChange={docStartTimeOnChange}
        docEndTimeOnChange={docEndTimeOnChange}
        setAvailability={setAvailability}
        saveSchedule={saveSchedule}
        selectedRanges={selectedRanges}
        deleteAvailability={deleteAvailability}
        // Patients props
        patients={docState.patients}
        isPatientsOpen={docState.isPatientsOpen}
        openPatientsModal={openPatientsModal}
        closePatientsModal={closePatientsModal}
      />
      
      {loading && <LoadingLayout content = {loadingText}/>}
      {!loading && (
        <MediaContext.Provider value = {mediaStream}>
          <Router>
            <Routes>
              <Route path = "/" element = {<Home props={props} status={status}/>}/>
              <Route path = "/video" element = {<VideoContainer />}/>
            </Routes>
          </Router>
        </MediaContext.Provider>
      )}
    </>
  )
}

export default App;
