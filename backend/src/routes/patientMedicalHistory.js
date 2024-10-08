const router = require("express").Router();

module.exports = db => {
  router.post("/history/:id", (req, res) => {
    // const patientId = req.params.id;
    const patientId = 4;

    const { dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription } = req.body;

    db.query(
      `INSERT INTO medical_histories (patient_id, birth_date, height, weight, smoker, diabetic, allergies, allergies_description, ongoing_medication, ongoing_medication_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [patientId, dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription]
    )
      .then(result => {
        res.status(201).json({ message: 'Record created', data: result.rows[0] });
      })
      .catch(error => {
        console.error('Error inserting record:', error);
        res.status(500).json({ message: 'Error creating record' });
      });
  });

  return router;
}