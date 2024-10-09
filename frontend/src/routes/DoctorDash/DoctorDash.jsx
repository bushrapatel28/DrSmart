import './DoctorDash.scss';
import { useState, useContext } from 'react';

import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';
import PatientsList from '../../PatientsList/PatientsList';
//Modals
import SchedulerModal from '../SchedulerModal/SchedulerModal';
import AfterVisitModal from '../AfterVisitModal/AfterVisitModal';
import useAfterVisitSummaryForm from '../../hooks/useAfterVisitData';
import MsgsModal from '../MsgsModal/MsgsModal';
import AcceptAppointments from '../AcceptAppointments/AcceptAppointments';

// images / icons
import patientDataIcon from '../../assets/patientdata-icon.png';
import SchedulerIcon from '../../assets/calendar-icon.png';
import AcceptAppIcon from '../../assets/accept-app-icon.png';
import visitSummaryIcon from '../../assets/visit-summary-icon.png';

import DoctorPatientsModal from '../DoctorPatientsModal/DoctorPatientsModal';

//Zoom Setup
import ZoomContext from '../../context/zoom-context';
import ZoomVideo from '@zoom/videosdk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useZoomData from '../../hooks/useZoomData';
import VideoButton from '../../feature/VideoButton/VideoButton';
import VideoCall from '../../components/VideoCall/VideoCall';

const DoctorDash = ({
  state,
  openSchedulerModal,
  closeSchedulerModal,
  openVisitModal,
  closeVisitModal,
  openAcceptApptModal,
  closeAcceptApptModal,
  handleAppt,
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
  isPatientsOpen,
  openPatientsModal,
  closePatientsModal
}) => {
  const { formData, handleInputChange, handleSubmit, selectDateTime, filterPassedTime, patients } = useAfterVisitSummaryForm();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Zoom Vidoe Setup
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { meetingArgs } = useZoomData();
  //Create a zoom client
  const client = ZoomVideo.createClient();
 
  return (
    <div className="doctordash">
      <TopNavigationBar role="doctor" username="Joseph Lister" />
      <div className='slogan'>
        <h1>SMARTER CARE, ANYTIME, ANYWHERE.</h1>
      </div>
      <div className="functions-section doctor-dash">
        {state.isSchedulerOpen ? (
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
            isSchedulerOpen={state.isSchedulerOpen}
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

        {state.isAcceptApptOpen ? (<AcceptAppointments
          closeAcceptApptModal={closeAcceptApptModal}
          apptData={state.apptData}
          handleAppt={handleAppt}
        />) : (<FunctionBlock icon={AcceptAppIcon} label="Accept Appointments" openModal={openAcceptApptModal} />)}
        {state.isVisitFormOpen ? (<AfterVisitModal
          isOpen={state.isVisitFormOpen}
          closeModal={closeVisitModal}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          selectDateTime={selectDateTime}
          filterPassedTime={filterPassedTime}
          patients={patients}
        />) : (<FunctionBlock icon={visitSummaryIcon} label="After Visit Summary" openModal={openVisitModal} />)}

        <div>
          {/* Zoom Video */}
          {meetingArgs.signature && 
            <ZoomContext.Provider value = {client}>
              <Router>
                <Routes>
                  <Route path = "/" element = {<VideoButton />}/>
                  <Route path = "/video" element = {<VideoCall meetingArgs = {meetingArgs}/>}/>
                </Routes>
              </Router>
            </ZoomContext.Provider>
          }
        </div>
      </div>


    </div>
  );
};

export default DoctorDash;
