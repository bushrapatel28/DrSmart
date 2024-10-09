import './ProfileModal.scss';
import { Fragment } from 'react';

const ProfileModal = ({ closeProfile, profilePatientArr }) => {
  const record = profilePatientArr;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>ProfileModal Info:", record);

  return (
    <div className='top-nav-parent'>
      <div className='top-nav-modal'>
        <div className='top-nav-modal__content'>
          <button className="top-nav-modal__close-button" onClick={closeProfile}>
            <span>&times;</span>
          </button>
          <h2 className='top-nav-modal__greeting'>Hi, Maria!</h2>
          {/* Records Table */}
          <h2>Your Records</h2>
          <table className='medical-data-table'>
            <thead>
              <tr>
                <th>Medical History</th>
                <th>Appointment Date</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {record.patient && (<td><a href={record.patient.medical_history} target='_blank' rel='noopener noreferrer'>
                  View Medical History
                </a></td>)}
                {record.records && record.records.map((record, index) => (
                  <Fragment key={index}>
                    <td>{record.appointment_date.map(date => date.appointment_date).join(', ')}</td>
                    <td>{record.diagnosis}</td>
                  </Fragment>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Prescriptions Table */}
          <h2>Your Prescriptions</h2>
          <table className='medical-data-table'>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Note</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {record.prescriptions && record.prescriptions.map((prescription, index) => (
                <tr key={index}>
                  <td>{prescription.medication}</td>
                  <td>{prescription.note}</td>
                  <td>{prescription.doctor.map(doc => doc.doctor_name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <h2>Your Tests</h2>
          <table className='medical-data-table'>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {record.tests && record.tests.map((test, index) => (
                <tr key={index}>
                  <td>{test.name}</td>
                  <td><a href={test.result} target='_blank' rel='noopener noreferrer'>View Result</a></td>
                  <td>{test.doctor.map(doc => doc.doctor_name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      </div >
    </div>
  );
};

export default ProfileModal;