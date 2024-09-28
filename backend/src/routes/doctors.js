const router = require("express").Router();

module.exports = db => {
  router.get("/doctors", (req, res) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    db.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', doctors.id,
          'name', doctors.name,
          'email', doctors.email,
          'profile_img', doctors.profile_image,
          'specialization', doctors.specialization,
          'date', availabilities.date,
          'vacant', availabilities.vacant,
          'start_time', time_slots.start_time,
          'end_time', time_slots.end_time
        )
      ) as doctor_data
      FROM doctors
      JOIN availabilities ON doctors.id = availabilities.doctor_id
      JOIN time_slots ON availabilities.time_slot_id = time_slots.id;
    `).then(({ rows }) => {
      res.json(rows[0].doctor_data);
    });
  });

  return router;
}