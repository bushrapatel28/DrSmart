import './HomePage.scss';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';

//Modals
import RecordDetailsModal from '../RecordDetailsModal/RecordDetailsModal';
import MsgsModal from '../MsgsModal/MsgsModal';
import MedicationModal from '../MedicationsModal/MedicationsModal';
import LabResultsModal from '../LabResultsModal/LabResultsModal';

// images / icons
import scheduleIcon from '../../assets/schedule-icon.png';
import ResultIcon from '../../assets/result-icon.png';
import MedicineIcon from '../../assets/medicine-icon.png';
import MsgsIcon from '../../assets/messages-icon.png';
import VisitsIcon from '../../assets/visits-icon.png';

const HomePage = ({
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
}) => {

  console.log("PATIENT LAB RESULTS FROM HomePage.jsx: ", patientLabResults);
  return (
    <div className="homepage">
      <TopNavigationBar />
      <div className="functions-section">
        <FunctionBlock icon={scheduleIcon} label="Schedule an Appointment"  openRecordModal={openRecordModal} />
        {isLabResultsOpen ? (<LabResultsModal patientLabResults={patientLabResults} closeLabResultsModal={closeLabResultsModal} />) : (<FunctionBlock icon={ResultIcon} label="Test Results"  openModal={openLabResultsModal} />)}
        {isMedicationOpen ? (<MedicationModal patientMedications={patientMedications} closeMedicationsModal={closeMedicationsModal} />) : (<FunctionBlock icon={MedicineIcon} label="Medications"  openModal={openMedicationsModal}  />)}
        {isMsgsOpen ? (<MsgsModal patientMsgs={patientMsgs} closeMsgsModal={closeMsgsModal} />) : (<FunctionBlock icon={MsgsIcon} label="Messages" openModal={openMsgsModal} />)}
        {isRecordOpen ? (<RecordDetailsModal patientRecord={patientRecord} closeRecordModal={closeRecordModal} />) : (<FunctionBlock icon={VisitsIcon} label="Visits" openModal={openRecordModal} />)}

      </div>

    </div>
  );
};

export default HomePage;
