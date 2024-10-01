const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id/lab-results', (req, res) => {
    const patientId = req.params.id;

    console.log(`Fetching lab results for patient ${patientId}`);

    const query = `
      SELECT 
        TO_CHAR(appointments.appointment_date, 'YYYY-MM-DD') AS appointment_date,
        doctors.name AS doctor_name,
        tests.name AS test_name,
        tests.result_url
      FROM tests
      JOIN appointments ON appointments.id = tests.appointment_id
      JOIN doctors ON doctors.id = tests.doctor_id
      WHERE tests.patient_id = $1
      ORDER BY appointments.appointment_date DESC;
    `;

    db.query(query, [patientId])
      .then(result => {
        res.json(result.rows);
      })
      .catch(error => {
        console.error("Error fetching lab results: ", error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  return router;
};
