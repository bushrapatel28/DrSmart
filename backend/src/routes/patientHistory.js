const router = require("express").Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    // const patientId = req.params.id;
    patientId = 4;

    db.query(`
      SELECT 
  json_build_object(
    'patient', json_build_object(
      'medical_history', patients.medical_history
    ),
    'records', (
      SELECT json_agg(json_build_object(
        'diagnosis', records.diagnosis,
        'appointment_date', (
          SELECT json_agg(json_build_object(
            'appointment_date', appointments.appointment_date
          ))
          FROM appointments
          WHERE records.appointment_id = appointments.id
        )
      ))
      FROM records
      WHERE records.patient_id = patients.id
    ),
    'tests', (
      SELECT json_agg(json_build_object(
        'name', tests.name,
        'result', tests.result_url,
        'doctor', (
          SELECT json_agg(json_build_object(
            'doctor_name', doctors.name
          ))
          FROM doctors
          WHERE tests.doctor_id = doctors.id  -- Corrected reference
        )
      ))
      FROM tests
      WHERE tests.patient_id = patients.id
    ),
    'prescriptions', (
      SELECT json_agg(json_build_object(
        'medication', prescriptions.medicine,
        'note', prescriptions.note,
        'doctor', (
          SELECT json_agg(json_build_object(
            'doctor_name', doctors.name
          ))
          FROM doctors
          WHERE prescriptions.doctor_id = doctors.id  -- Corrected reference
        )
      ))
      FROM prescriptions
      WHERE prescriptions.patient_id = patients.id
    ),
    'doctors', (
      SELECT json_agg(json_build_object(
        'id', doctors.id,
        'name', doctors.name,
        'specialization', doctors.specialization
      ))
      FROM doctors
      WHERE doctors.id IN (
        SELECT doctor_id FROM records WHERE records.patient_id = patients.id
      )
    )
  ) AS patient_data
FROM patients
WHERE patients.id = $1;

    `, [patientId]).then(({ rows }) => {
      res.json(rows[0].patient_data);
    });
  });

  return router;
}