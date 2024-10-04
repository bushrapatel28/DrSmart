import './DoctorDash.scss';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';
import PatientsList from '../../PatientsList/PatientsList';
//Modals
import SchedulerModal from '../SchedulerModal/SchedulerModal';


// images / icons
import patientDataIcon from '../../assets/patientdata-icon.png';
import SchedulerIcon from '../../assets/calendar-icon.png';
import MsgsIcon from '../../assets/messages-icon.png';
import visitSummaryIcon from '../../assets/visit-summary-icon.png';


const DoctorDash = ({
  isSchedulerOpen,
  openSchedulerModal,
  closeSchedulerModal,
  isPatientRecordOpen,
  openPatientRecordModal,
  closePatientRecordModal,
  docStartDate,
  docEndDate,
  docStartTime,
  docEndTime,
  datesOnChange,
  docStartTimeOnChange,
  docEndTimeOnChange,
  setAvailability,
  saveSchedule
}) => {
  return (
    <div className="doctordash">
      <TopNavigationBar role="doctor" username="Marie Curie" />
      <div className="functions-section">
        {isSchedulerOpen ? (
          <SchedulerModal
            docStartDate={docStartDate}
            docEndDate={docEndDate}
            docStartTime={docStartTime}
            docEndTime={docEndTime}
            datesOnChange={datesOnChange}
            docStartTimeOnChange={docStartTimeOnChange}
            docEndTimeOnChange={docEndTimeOnChange}
            setAvailability={setAvailability}
            saveSchedule={saveSchedule}
            isSchedulerOpen={isSchedulerOpen}
            closeSchedulerModal={closeSchedulerModal}
          />) : (<FunctionBlock icon={SchedulerIcon} label="Select Your Schedule" openModal={openSchedulerModal} />)}


        {isPatientRecordOpen ? <PatientsList closePatientRecordModal={closePatientRecordModal} /> : <FunctionBlock icon={patientDataIcon} label="My Patients Data" openModal={openPatientRecordModal} />}
        {/* {isMsgsOpen ? (<MsgsModal patientMsgs={patientMsgs} closeMsgsModal={closeMsgsModal} />) : (<FunctionBlock icon={MsgsIcon} label="Messages" openModal={openMsgsModal} />)} */}
        <FunctionBlock icon={MsgsIcon} label="Messages" />
        <FunctionBlock icon={visitSummaryIcon} label="After Visit Summary" />

      </div>

    </div>
  );
};

export default DoctorDash;
