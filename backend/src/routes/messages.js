const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id/messages', (req, res) => {
    const patientId = req.params.id;

    console.log(`Fetching messages for patient ${patientId}`);

    const query = `
      SELECT notifications.message, 
             appointments.appointment_date AS appointment_date, 
             doctors.name AS doctor_name
      FROM notifications
      JOIN appointments ON notifications.appointment_id = appointments.id
      JOIN doctors ON appointments.doctor_id = doctors.id
      WHERE notifications.patient_id = $1
      ORDER BY appointment_date DESC;
    `;

    db.query(query, [patientId])
      .then(result => {
        res.json(result.rows.length > 0 ? result.rows : []);
      })
      .catch(error => {
        console.error("Error fetching messages: ", error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  return router;
};
