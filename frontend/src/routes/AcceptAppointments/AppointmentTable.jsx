// AppointmentTable.jsx
import React from 'react';

const AppointmentTable = ({ appointments, title, handleAppt }) => {
  return (
    <div>
      <h3>{title}</h3>
      {appointments.length > 0 ? (
        <table className="accept_appt_table appt_list">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient's Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.id}>
                <td>{index + 1}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{appt.time}</td>
                <td>{appt.patient_name}</td>
                <td>{appt.type}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === 'Pending' ? (
                    <>
                      <button className="accept-btn" onClick={() => handleAppt(appt.id, "Accept")}>Accept</button>
                      <button className="reject-btn" onClick={() => handleAppt(appt.id, "Reject")}>Reject</button>
                    </>
                  ) : appt.status === 'Scheduled' ? (
                    <>
                      <button className="cancel-btn" onClick={() => handleAppt(appt.id, "Cancel")}>Cancel</button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );
};

export default AppointmentTable;
