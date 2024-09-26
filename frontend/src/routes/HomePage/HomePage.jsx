import './HomePage.scss';
import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import ScheduleAppModal from '../ScheduleAppModal/ScheduleAppModal'
import scheduleIcon from '../../assets/schedule-icon.png';
import ResultIcon from '../../assets/result-icon.png';
import MedicineIcon from '../../assets/medicine-icon.png';
import MsgsIcon from '../../assets/messages-icon.png';
import VisitsIcon from '../../assets/visits-icon.png';

const HomePage = () => {
  return (
    <div className="homepage">
      <TopNavigationBar />
      <div className="functions-section">
        <ScheduleAppModal icon={scheduleIcon} label="Schedule an Appointment" />
        <ScheduleAppModal icon={ResultIcon} label="Test Results" />
        <ScheduleAppModal icon={MedicineIcon} label="Medications" />
        <ScheduleAppModal icon={MsgsIcon} label="Messages" />
        <ScheduleAppModal icon={VisitsIcon} label="Visits" />
      </div>

    </div>
  );
};

export default HomePage;
