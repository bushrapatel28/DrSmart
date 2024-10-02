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
  setDocStartDate,
  docEndDate,
  setDocEndDate,
  docStartTime,
  setDocStartTime,
  docEndTime,
  setDocEndTime,
  docOnChange,
  setAvailability,
  timeSlots,
  add
}) => {
  return (
    <div className="doctordash">
      <TopNavigationBar role="doctor" username="Marie Curie" />
      <div className="functions-section">
        {isSchedulerOpen ? ( 
          <SchedulerModal 
            doctorData={doctor} 
            isSchedulerOpen={isSchedulerOpen}
            closeSchedulerModal={closeSchedulerModal} 
            docStartDate={docStartDate}
            setDocStartDate={setDocStartDate}
            docEndDate={docEndDate}
            setDocEndDate={setDocEndDate}
            docStartTime={docStartTime}
            setDocStartTime={setDocStartTime}
            docEndTime={docEndTime}
            setDocEndTime={setDocEndTime}
            docOnChange={docOnChange}
            setAvailability={setAvailability}
            timeSlots={timeSlots}
            add={add}  
            />) : (<FunctionBlock icon={SchedulerIcon} label="Select Your Schedule"  openModal={openSchedulerModal} />)}
            <FunctionBlock icon={patientDataIcon} label="Patients Data"  openModal={openSchedulerModal} />
      </div>

    </div>
  );
};

export default DoctorDash;
