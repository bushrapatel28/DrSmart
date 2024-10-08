const router = require("express").Router();

module.exports = db => {
  //router for get request to fetch pending + Scheduled + completed appointments for ${doc_id}
  router.get("/appointments/:id", (req, res) => {
    const doctorId = req.params.id;
  
    db.query(`
      SELECT
        appointments.id,
        appointments.appointment_date AS date,
        appointments.appointment_time AS time,
        appointments.appointment_type AS type,
        appointments.status,
        patients.name AS patient_name
      FROM appointments
      JOIN patients ON appointments.patient_id = patients.id
      WHERE appointments.doctor_id = $1
      AND appointments.status NOT IN ('Cancelled', 'Rejected')
      ORDER BY appointments.appointment_date ASC, appointments.appointment_time ASC
    `, [doctorId])
      .then(({ rows }) => {
        res.json(rows); // Send all rows (appointments)
      })
      .catch((error) => {
        console.error("Error executing query: ", error);
        res.status(500).json({ error: "Database query error" });
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

  //Update appointment type router
  router.post("/appointments/update", (req, res) => {
    const { appointment_id, action } = req.body;
    console.log("Appointment Update triggered in backend");

    if (!appointment_id || !action) {
      return res.status(400).json({ error: "Appointment ID and action are required." });
    }

    let newType;
    switch (action) {
      case "Accept":
        newType = "Scheduled";
        break;
      case "Reject":
        newType = "Rejected";
        break;
      case "Cancel":
        newType = "Cancelled";
        break;
      default:
        return res.status(400).json({ error: "Invalid action." });
    }

    db.query(`
      UPDATE appointments
      SET status = $1
      WHERE id = $2
      RETURNING *
    `, [newType, appointment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return res.status(404).json({ error: "Appointment not found." });
      }
      console.log("Response from db, rows: ", rows);
      res.json({
        message: `Appointment ${action}ed successfully`,
        appointment: rows[0],
      });
    })
    .catch((err) => {
      console.error("Error updating appointment:", err);
      res.status(500).json({ error: "Internal server error" });
    });
  });


  return router;
}