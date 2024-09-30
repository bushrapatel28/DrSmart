const express = require('express');  // Ensure Express is required
const router = express.Router();     // Initialize the router

module.exports = (db) => {
  router.get('/:id/visits', (req, res) => {
    const patientId = req.params.id;
    
    console.log(`Fetching visits for patient ${patientId}`);

    const query = `
      SELECT 
        TO_CHAR(appointments.appointment_date, 'YYYY-MM-DD') AS appointment_date,
        records.diagnosis,
        doctors.name AS doctor_name,
        tests.name AS suggested_tests,
        prescriptions.medicine AS prescribed_medication
      FROM appointments
      JOIN records ON records.appointment_id = appointments.id
      JOIN doctors ON doctors.id = appointments.doctor_id
      LEFT JOIN tests ON tests.appointment_id = appointments.id
      LEFT JOIN prescriptions ON prescriptions.record_id = records.id
      WHERE appointments.patient_id = $1
      ORDER BY appointments.appointment_date DESC;

    `;

    db.query(query, [patientId])
      .then(result => {
        res.json(result.rows);
      })
      .catch(error => {
        console.error("Error fetching visits: ", error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  return router;  // Return the router so it can be used by the app
};
