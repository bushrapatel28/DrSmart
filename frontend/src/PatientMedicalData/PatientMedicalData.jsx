import React from 'react';
import { useState, useEffect } from 'react';

const PatientMedicalData = ({ patientId }) => {
  const [data, setData] = useState({
    records: [],
    prescriptions: [],
    tests: [],
  });

  useEffect(() => {
    fetch('http://localhost:8001/patients/:id/data', { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setData({
          records: result.records,
          prescriptions: result.prescriptions,
          tests: result.tests,
        });
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, []);

  // const records = patients.map((record, index) => (
  //   <tr key={index}>
  //     <td>{record.name}</td>
  //     <td>{record.email}</td>
  //     <td>{record.id}</td>
  //     <td>
  //       <a href={record.medical_history} target='_blank' rel='noopener noreferrer'>
  //         report.pdf
  //       </a>
  //     </td>
  //   </tr>
  // ));

  return (
    <div className='patient-medical-data'>
      <h1>Patient Medical Data</h1>

      {/* Records Table */}
      <h2>Records</h2>
      <table className='medical-data-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.records.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.details}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Prescriptions Table */}
      <h2>Prescriptions</h2>
      <table className='medical-data-table'>
        <thead>
          <tr>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {data.prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>{prescription.medication}</td>
              <td>{prescription.dosage}</td>
              <td>{prescription.instructions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tests Table */}
      <h2>Tests</h2>
      <table className='medical-data-table'>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.tests.map((test, index) => (
            <tr key={index}>
              <td>{test.test_name}</td>
              <td>{test.result}</td>
              <td>{test.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientMedicalData;