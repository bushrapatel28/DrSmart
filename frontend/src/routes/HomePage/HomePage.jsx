import './HomePage.scss';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';

//Modals
import RecordDetailsModal from '../RecordDetailsModal/RecordDetailsModal';
import MsgsModal from '../MsgsModal/MsgsModal';
import MedicationModal from '../MedicationsModal/MedicationsModal';
import LabResultsModal from '../LabResultsModal/LabResultsModal';
import Appointment from '../../components/Appointment/Appointment';
import ProfileModal from '../ProfileModal/ProfileModal';
import SettingsModal from '../SettingsModal/SettingsModal';

// images / icons
import scheduleIcon from '../../assets/schedule-icon.png';
import ResultIcon from '../../assets/result-icon.png';
import MedicineIcon from '../../assets/medicine-icon.png';
import MsgsIcon from '../../assets/messages-icon.png';
import VisitsIcon from '../../assets/visits-icon.png';
import RegistrationForm from '../../Registration/RegistrationForm';
import MedicalHistoryModal from '../MedicalHistoryModal/MedicalHistoryModal';


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
  doctorData,
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
}) => {
  /*TopNav State deconstruction*/
  const isProfileOpen = topNavState.isProfileOpen;
  const isSettingsOpen = topNavState.isSettingsOpen;
  const profilePatientArr = topNavState.patient;

  console.log("PATIENT LAB RESULTS FROM HomePage.jsx: ", patientLabResults);
  return (
    <div className="homepage">
      <TopNavigationBar
        role="patient"
        username="Frank Navasky"
        openProfile={openProfile}
        openSettings={openSettings}
      />
      <div>
        {isProfileOpen && <ProfileModal closeProfile={closeProfile} profilePatientArr={profilePatientArr} />}
        {isSettingsOpen && <SettingsModal closeSettings={closeSettings} />}
      </div>
      <div className="functions-section">
        {isAppointmentOpen ? (<Appointment
          doctorData={doctorData}
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
          closeAppointmentModal={closeAppointmentModal}
          isAppointmentOpen={isAppointmentOpen}
          filterPassedTime={filterPassedTime}
        />
        ) : (<FunctionBlock icon={scheduleIcon} label="Schedule an Appointment" openModal={openAppointmentModal} />)}
        {isLabResultsOpen ? (<LabResultsModal patientLabResults={patientLabResults} closeLabResultsModal={closeLabResultsModal} />) : (<FunctionBlock icon={ResultIcon} label="Test Results" openModal={openLabResultsModal} />)}
        {isMedicationOpen ? (<MedicationModal patientMedications={patientMedications} closeMedicationsModal={closeMedicationsModal} />) : (<FunctionBlock icon={MedicineIcon} label="Medications" openModal={openMedicationsModal} />)}
        {isMsgsOpen ? (<MsgsModal patientMsgs={patientMsgs} closeMsgsModal={closeMsgsModal} />) : (<FunctionBlock icon={MsgsIcon} label="Messages" openModal={openMsgsModal} />)}

      </div>
      <div className="functions-section">
        {isRecordOpen ? (<RecordDetailsModal patientRecord={patientRecord} closeRecordModal={closeRecordModal} />) : (<FunctionBlock icon={VisitsIcon} label="Visits" openModal={openRecordModal} />)}
        <FunctionBlock icon={scheduleIcon} label="Schedule an Appointment" openModal={openMedicalHistoryModal} />
        {isMedicalHistoryOpen ? (<MedicalHistoryModal patientRecord={patientRecord} closeMedicalHistoryModal={closeMedicalHistoryModal} />) : (<FunctionBlock icon={VisitsIcon} label="Medical History" openModal={openMedicalHistoryModal} />)}
      </div>

    </div>
  );
};

export default HomePage;
