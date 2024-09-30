const router = require("express").Router();

module.exports = db => {
  router.get("/appointments", (req, res) => {

    db.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', appointments.id,
          'date', appointments.appointment_date,
          'time', appointments.appointment_time,
          'type', appointments.appointment_type,
          'status', appointments.status,
          'patient', (
            SELECT
              json_agg(
                json_build_object(
                  'patient_id', patients.id,
                  'name', patients.name,
                  'email', patients.email
                )
              )
            FROM patients
            WHERE patients.id = appointments.patient_id
          ),
          'doctor', (
            SELECT
              json_agg(
                json_build_object(
                  'doctor_id', doctors.id,
                  'name', doctors.name,
                  'email', doctors.email
                )
              )
            FROM doctors
            WHERE doctors.id = appointments.doctor_id
          )
        )
      ) as appointment_data
      FROM appointments
    `).then(({ rows }) => {
      res.json(rows[0].appointment_data);
    });
  });

  router.post("/appointments/new", (req, res) => {
    // Extract appointment details from request body
    const {
      appointment_date,
      appointment_time,
      appointment_type,
      status,
      patient_id,
      doctor_id
    } = req.body;

    // Validate required fields (optional step, but recommended)
    if (!appointment_date || !appointment_time || !appointment_type || !status || !patient_id || !doctor_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Insert new appointment into the database
    db.query(`
      INSERT INTO appointments (appointment_date, appointment_time, appointment_type, status, patient_id, doctor_id) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, 
    [appointment_date, appointment_time, appointment_type, status, patient_id, doctor_id]
    )
    .then(({ rows }) => {
      // Return the created appointment as a response
      res.status(201).json({
        message: "Appointment created successfully",
        appointment: rows[0],
      });
    })
    .catch((err) => {
      console.error("Error creating appointment:", err);
      res.status(500).json({ error: "Internal server error" });
    });
    
    // then(data => {
    //   return data.rows[0];
    // }).then(newAppt => {
    //   const newApptId = newAppt.id;
    //   res.redirect(`/`);          
    // });
  });

  return router;
}