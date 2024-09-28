const router = require("express").Router();

module.exports = db => {
  router.get("/doctors", (req, res) => {

    db.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', doctors.id,
          'name', doctors.name,
          'email', doctors.email,
          'profile_img', doctors.profile_image,
          'specialization', doctors.specialization,
          'availability', (
            SELECT
              json_agg(
                json_build_object(
                  'availability_id', availabilities.id,
                  'date', availabilities.date,
                  'vacant', availabilities.vacant,
                  'time', (
                    SELECT
                      json_agg(
                        json_build_object(
                          'start_time', time_slots.start_time,
                          'end_time', time_slots.end_time
                        )
                      )
                    FROM time_slots
                    WHERE time_slots.id = availabilities.time_slot_id
                  )
                )
              )
            FROM availabilities
            WHERE doctors.id = availabilities.doctor_id
          )
        )
      ) as doctor_data
      FROM doctors
    `).then(({ rows }) => {
      res.json(rows[0].doctor_data);
    });
  });

  return router;
}