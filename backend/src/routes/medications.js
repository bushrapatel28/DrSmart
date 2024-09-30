const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id/medications', (req, res) => {
    const patientId = req.params.id;

    console.log(`Fetching medications for patient ${patientId}`);

    const query = `
      SELECT prescriptions.medicine, prescriptions.note, doctors.name AS doctor_name, appointments.appointment_date
      FROM prescriptions
      JOIN records ON prescriptions.record_id = records.id
      JOIN doctors ON prescriptions.doctor_id = doctors.id
      JOIN appointments ON records.appointment_id = appointments.id
      WHERE prescriptions.patient_id = $1
      ORDER BY appointments.appointment_date DESC;
    `;

    db.query(query, [patientId])
      .then(result => {
        res.json(result.rows);
      })
      .catch(error => {
        console.error("Error fetching medications: ", error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  return router;
};
