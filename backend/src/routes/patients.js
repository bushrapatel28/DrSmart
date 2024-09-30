const router = require("express").Router();

module.exports = db => {
  router.get("/patients", (req, res) => {

    db.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', patients.id,
          'name', patients.name,
          'email', patients.email,
          'profile_img', patients.profile_image,
          'address', patients.address,
          'medical_history', patients.medical_history
          ) 
    ) as patient_data
    FROM patients;
    `).then(({ rows }) => {
      res.json(rows[0].patient_data);
    });
  });

  return router;
}