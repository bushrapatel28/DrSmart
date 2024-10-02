const router = require("express").Router();

module.exports = db => {
  router.get("/timeslots", (req, res) => {
    db.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', time_slots.id,
          'start_time', time_slots.start_time,
          'end_time', time_slots.end_time
        )
      ) as time_slots_data
      FROM time_slots
    `).then(({ rows }) => {
      res.json(rows[0].time_slots_data);
    });
  });

  router.post("/:id/availability/new", (req, res) => {
    // Extract appointment details from request body
    const {
      dates,
      vacant,
      time_slot_ids,
      doctor_id
    } = req.body;

    console.log("DATE ARRAY", dates.length);
    console.log("DATE ARRAY", dates);
    console.log("TIME ARRAY", time_slot_ids.length);
    console.log("TIME ARRAY", time_slot_ids);
 
    

    // Insert new availability into the database
    // db.query(`
    //   INSERT INTO availabilities (date, vacant, time_slot_id, doctor_id)
    //   VALUES ($1, $2, $3, $4, $5, $6)
    //   RETURNING *
    // `, 
    // [appointment_date, appointment_time, appointment_type, status, patient_id, doctor_id]
    // )
    // .then(({ rows }) => {
    //   // Return the created appointment as a response
    //   res.status(201).json({
    //     message: "Appointment created successfully",
    //     appointment: rows[0],
    //   });
    // })
    // .catch((err) => {
    //   console.error("Error creating appointment:", err);
    //   res.status(500).json({ error: "Internal server error" });
    // });
    
    // then(data => {
    //   return data.rows[0];
    // }).then(newAppt => {
    //   const newApptId = newAppt.id;
    //   res.redirect(`/`);          
    // });
  });

  return router;
}