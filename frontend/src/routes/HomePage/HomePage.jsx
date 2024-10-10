import './HomePage.scss';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';

//Modals
import RecordDetailsModal from '../RecordDetailsModal/RecordDetailsModal';
import MsgsModal from '../MsgsModal/MsgsModal';
import MedicationModal from '../MedicationsModal/MedicationsModal';
import LabResultsModal from '../LabResultsModal/LabResultsModal';
// import Appointment from '../../components/Appointment/Appointment';
import ProfileModal from '../ProfileModal/ProfileModal';
import SettingsModal from '../SettingsModal/SettingsModal';
import ArticleSuggestions from '../../components/ArticleSuggestions/ArticleSuggestions';
// images / icons
import scheduleIcon from '../../assets/schedule-icon.png';
import ResultIcon from '../../assets/result-icon.png';
import MedicineIcon from '../../assets/medicine-icon.png';
import MsgsIcon from '../../assets/messages-icon.png';
import VisitsIcon from '../../assets/visits-icon.png';
import MedicalHistoryIcon from '../../assets/medical-history-icon.png';
import RegistrationForm from '../../Registration/RegistrationForm';
import MedicalHistoryModal from '../MedicalHistoryModal/MedicalHistoryModal';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import backgroundImage from '../../assets/home-background-img.jpg'


const HomePage = ({
  /*TopNav Props*/
  topNavState,
  openProfile,
  closeProfile,
  openSettings,
  closeSettings,
  /*TopNav Props End*/
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
  closeMedicalHistoryModal,
  /*Appointment Props Start */
  state,
  doctorData,
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
  filterPassedTime,
  // Medical History Data
  formData
}) => {
  /*TopNav State deconstruction*/
  const isProfileOpen = topNavState.isProfileOpen;
  const isSettingsOpen = topNavState.isSettingsOpen;
  const profilePatientArr = topNavState.patient;

  // console.log("PATIENT LAB RESULTS FROM HomePage.jsx: ", patientLabResults);
  return (
    <>
    <div className="homepage">
      <TopNavigationBar
        role="patient"
        username="Maria Garcia"
        openProfile={openProfile}
        openSettings={openSettings}
      />
      <div className='slogan'>
        <h1>SMARTER CARE, ANYTIME, ANYWHERE.</h1>
      </div>
      <div>
        {isProfileOpen && <ProfileModal closeProfile={closeProfile} profilePatientArr={profilePatientArr} />}
        {isSettingsOpen && <SettingsModal closeSettings={closeSettings} />}
      </div>
      <div className='functions-all'>
        <div className="functions-section">
          {isMedicalHistoryOpen ? (
            <MedicalHistoryModal
              formData={formData}
              patientRecord={patientRecord}
              closeMedicalHistoryModal={closeMedicalHistoryModal}
              openProfile={openProfile}
            />) : (
            <FunctionBlock
              icon={MedicalHistoryIcon}
              label="Medical History"
              openModal={openMedicalHistoryModal}
            />)}
          {isAppointmentOpen ? (<AppointmentModal
            isAppointmentOpen={isAppointmentOpen}
            closeAppointmentModal={closeAppointmentModal}
            toggleAppointmentType={toggleAppointmentType}
            state={state}
            doctorData={doctorData}
            // startDate={startDate}
            // startTime={startTime}
            // isVirtual={isVirtual}
            // showDoc={showDoc}
            saveDoctorInfo={saveDoctorInfo}
            selectDateTime={selectDateTime}
            next={next}
            clear={clear}
            save={save}
            cancel={cancel}
            filterPassedTime={filterPassedTime}
          />
          ) : (<FunctionBlock icon={scheduleIcon} label="Schedule an Appointment" openModal={openAppointmentModal} />)}
          {isMsgsOpen ? (<MsgsModal msgsData={patientMsgs} closeMsgsModal={closeMsgsModal} />) : (<FunctionBlock icon={MsgsIcon} label="Messages" openModal={openMsgsModal} />)}

          {isRecordOpen ? (
            <RecordDetailsModal
              patientRecord={patientRecord}
              closeRecordModal={closeRecordModal}
            />) : (
            <FunctionBlock
              icon={VisitsIcon}
              label="Visits"
              openModal={openRecordModal}
            />)}
          {isMedicationOpen ? (<MedicationModal patientMedications={patientMedications} closeMedicationsModal={closeMedicationsModal} />) : (<FunctionBlock icon={MedicineIcon} label="Medications" openModal={openMedicationsModal} />)}
          {isLabResultsOpen ? (<LabResultsModal patientLabResults={patientLabResults} closeLabResultsModal={closeLabResultsModal} />) : (<FunctionBlock icon={ResultIcon} label="Test Results" openModal={openLabResultsModal} />)}

        </div>
      </div>
      
    </div>
    <div>
    {/* <h2>{patient.name}</h2>
    <p>Diagnosis: {patient.diagnosis}</p> */}

    <ArticleSuggestions diagnosis={"Diabetes"} />

    </div>
  </>
  );
};

export default HomePage;
