import React from 'react';
import { useState, useEffect } from 'react';

// const patients = [
//   {
//     id: 1,
//     name: 'Sven Jones',
//     email: 'jones.s@example.com',
//     password: 'Ne3_PaT13nT',
//     profile_image: 'https://picsum.photos/200/300',
//     address: '456 Elm St, H2Y 3Z4, Montreal, QC',
//     medical_history: 'https://www.retention-project.eu/ig/Patient-P001.json.html'
//   },
//   {
//     id: 2,
//     name: 'Alice Smith',
//     email: 'alice.smith@example.com',
//     password: 'A1b2C3d4',
//     profile_image: 'https://picsum.photos/200/300',
//     address: '123 Main St, A1B 2C3, Toronto, ON',
//     medical_history: 'https://www.retention-project.eu/ig/Patient-P002.json.html'
//   },
//   {
//     id: 3,
//     name: 'Robert Brown',
//     email: 'robert.brown@example.com',
//     password: 'R0b3rt_PaT13nT',
//     profile_image: 'https://picsum.photos/200/300',
//     address: '467 W 12th Ave, V8Y 3J7, Vancouver, BC',
//     medical_history: 'https://www.retention-project.eu/ig/Patient-P003.json.html'
//   }
// ];
const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/patients', { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPatients(data);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, []);

  const records = patients.map((record, index) => (
    <tr key={index}>
      <td>{record.name}</td>
      <td>{record.email}</td>
      <td>{record.id}</td>
      <td>
        <a href={record.medical_history} target='_blank' rel='noopener noreferrer'>
          report.pdf
        </a>
      </td>
    </tr>
  ));

  return (
    <div className='patient_list'>
      <h1>
        Patient Records
      </h1>
      <h2>Medical Records</h2>
      <table className='patient_list_table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>ID</th>
            <th>Medical File</th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;