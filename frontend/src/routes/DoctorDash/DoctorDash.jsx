import './DoctorDash.scss';
import { useState } from 'react';

import TopNavigationBar from '../../components/TopNavigationBar/TopNavigationBar';
import FunctionBlock from '../FunctionBlock/FunctionBlock';
import PatientsList from '../../PatientsList/PatientsList';
//Modals
import SchedulerModal from '../SchedulerModal/SchedulerModal';
import AfterVisitModal from '../AfterVisitModal/AfterVisitModal';
import useAfterVisitSummaryForm from '../../hooks/useAfterVisitData';
import MsgsModal from '../MsgsModal/MsgsModal';

// images / icons
import patientDataIcon from '../../assets/patientdata-icon.png';
import SchedulerIcon from '../../assets/calendar-icon.png';
import MsgsIcon from '../../assets/messages-icon.png';
import visitSummaryIcon from '../../assets/visit-summary-icon.png';

import DoctorPatientsModal from '../DoctorPatientsModal/DoctorPatientsModal';

const DoctorDash = ({
  state,
  openSchedulerModal,
  closeSchedulerModal,
  openVisitModal,
  closeVisitModal,
  openDocMsgsModal,
  closeDocMsgsModal,
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

  return (
    <div className="doctordash">
      <TopNavigationBar role="doctor" username="Marie Curie" />
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

        {state.isMsgsOpen ? (<MsgsModal msgsData={state.doctorMsgs} closeMsgsModal={closeDocMsgsModal} />) : (<FunctionBlock icon={MsgsIcon} label="Messages" openModal={openDocMsgsModal} />)}
        {/* <FunctionBlock icon={MsgsIcon} label="Messages" openModal={openDocMsgsModal} /> */}

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


      </div>

    </div>
  );
};

export default DoctorDash;
