import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';

const PatientMedicalData = ({ patientId }) => {
  const [record, setRecord] = useState({});

  useEffect(() => {
    fetch('/patients/4')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log("Result data:", result);
        setRecord(result);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, []);

  return (
    <div className='patient-medical-data'>
      <h1>Patient Medical Data</h1>
      {/* Records Table */}
      <h2>Records</h2>
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
      Prescriptions Table
      <h2>Prescriptions</h2>
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


      <h2>Tests</h2>
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
    </div>
  );
};

export default PatientMedicalData;