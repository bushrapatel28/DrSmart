const fs = require("fs");
const path = require("path");

const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db")

const appointment = require("./routes/appointment");


module.exports = function application(ENV) {

  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use("/patient", appointment(db));

  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function () {
    return db.end();
  };

  app.post('/patient/history/:id', (req, res) => {
    const { dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription } = req.body;

    pool.query(
      `INSERT INTO medical_histories (date_of_birth, height, weight, smoker, diabetes_status, allergies, allergy_description, medication, medication_description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription]
    )
      .then(result => {
        res.status(201).json({ message: 'Record created', data: result.rows[0] });
      })
      .catch(error => {
        console.error('Error inserting record:', error);
        res.status(500).json({ message: 'Error creating record' });
      });
  });

  return app;
};
