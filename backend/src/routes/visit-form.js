// const router = require("express").Router();

// module.exports = db => {
//   router.post("/:id/visit-form", (req, res) => {
//     const doctor_id = req.params.id;
//     // const doctor_id = 4;
//     console.log("the data from front end: ", req.body );
//     const { appointmentDate, appointmentTime, combinedDiagnosis, patientName, prescription } = req.body;
//     res.status(201).json({ message: 'Data Received', data: req.body});
//     // db.query(
//     //   `INSERT INTO medical_histories (patient_id, birth_date, height, weight, smoker, diabetic, allergies, allergies_description, ongoing_medication, ongoing_medication_description)
//     //    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
//     //   [patientId, dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription]
//     // )
//     //   .then(result => {
//     //     res.status(201).json({ message: 'Record created', data: result.rows[0] });
//     //   })
//     //   .catch(error => {
//     //     console.error('Error inserting record:', error);
//     //     res.status(500).json({ message: 'Error creating record' });
//     //   });
//   });

//   return router;
// }

const router = require("express").Router();

module.exports = db => {
  router.post("/:doctorId/visit-form", (req, res) => {
    console.log("*******The data from front end: ", req.body );

    const doctor_id = req.params.doctorId;
    const { appointmentDate, appointmentTime, patientId, combinedDiagnosis, prescription } = req.body;

    const updateAppointmentQuery = `
      UPDATE appointments 
      SET status = 'Completed' 
      WHERE appointment_date = $1 AND appointment_time = $2 AND doctor_id = $3 AND patient_id = $4
      RETURNING *;
    `;
    // const selectAllQuery = `SELECT * FROM appointments`;
    db.query(updateAppointmentQuery, [appointmentDate, appointmentTime, doctor_id, patientId])
      .then(appointmentResult => {
        console.log("Appointments result from db: ", appointmentResult);
        if (appointmentResult.rows.length === 0) {
          return res.status(404).json({ message: 'Appointment not found or no permission to update' });
        }

        const appointmentId = appointmentResult.rows[0].id;

        const insertRecordQuery = `
          INSERT INTO records (diagnosis, patient_id, doctor_id, appointment_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;

        return db.query(insertRecordQuery, [combinedDiagnosis, patientId, doctor_id, appointmentId])
          .then(recordResult => {
            const recordId = recordResult.rows[0].id;

            const insertPrescriptionQuery = `
              INSERT INTO prescriptions (medicine, note, patient_id, doctor_id, record_id)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *;
            `;

            return db.query(insertPrescriptionQuery, [prescription.medicine, prescription.dosage, patientId, doctor_id, recordId])
              .then(prescriptionResult => {
                res.status(201).json({
                  message: 'Appointment updated, record and prescription inserted successfully',
                  appointment: appointmentResult.rows[0],
                  record: recordResult.rows[0],
                  prescription: prescriptionResult.rows[0]
                });
              });
          });
      })
      .catch(error => {
        console.error('Error during database operation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });

  return router;
}
