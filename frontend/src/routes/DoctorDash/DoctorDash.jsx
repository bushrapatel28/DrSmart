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

import DoctorPatientsModal from '../DoctorPatientsModal/DoctorPatientsModal';

const DoctorDash = ({
  isSchedulerOpen,
  openSchedulerModal,
  closeSchedulerModal,
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
  deleteAvailability,
  patients,
  isPatientsOpen,
  openPatientsModal,
  closePatientsModal
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
            selectedRanges={selectedRanges}
            deleteAvailability={deleteAvailability}
            isSchedulerOpen={isSchedulerOpen}
            closeSchedulerModal={closeSchedulerModal}
          />) : (<FunctionBlock icon={SchedulerIcon} label="Select Your Schedule" openModal={openSchedulerModal} />)}
        {isPatientsOpen ? (
          <DoctorPatientsModal
            patientsList={patients}
            closePatientsModal={closePatientsModal} />
        ) : (
          <FunctionBlock
            icon={patientDataIcon}
            label="Patients Data"
            openModal={openPatientsModal} />
        )}
      </div>

    </div>
  );
};

export default DoctorDash;
