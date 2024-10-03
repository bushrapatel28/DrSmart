import './DoctorDash.scss';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';

//Modals
import SchedulerModal from '../SchedulerModal/SchedulerModal';


// images / icons
import patientDataIcon from '../../assets/patientdata-icon.png';
import SchedulerIcon from '../../assets/calendar-icon.png';

const DoctorDash = ({
  doctor,
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
        <FunctionBlock icon={patientDataIcon} label="Patients Data" openModal={openSchedulerModal} />
      </div>

    </div>
  );
};

export default DoctorDash;
