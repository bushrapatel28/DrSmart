const fs = require("fs");
const path = require("path");

const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db")

const appointments = require("./routes/appointments");
const doctors = require("./routes/doctors");
const patients = require("./routes/patients");
const patient_history = require("./routes/patientHistory");
const visits = require('./routes/visits');
const messages = require('./routes/messages');
const medications = require('./routes/medications');
const labresults = require('./routes/lab-results');

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(ENV) {

  app.use(cors());

  app.use(helmet());
  app.use(bodyparser.json());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use("/api", appointments(db));
  app.use("/api", doctors(db));
  app.use("/api", patients(db));

  app.use("/patient", patient_history(db));
  app.use('/patient', visits(db));
  app.use('/patient', messages(db));  
  app.use('/patient', medications(db));  
  app.use('/patient', labresults(db));  

  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/debug/reset", (req, res) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              res.status(200).send("Database Reset");
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

  // app.post('/patient/history/:id', (req, res) => {
  //   const { dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription } = req.body;

  //   db.query(
  //     `INSERT INTO medical_histories (date_of_birth, height, weight, smoker, diabetes_status, allergies, allergy_description, medication, medication_description)
  //    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
  //     [dateOfBirth, height, weight, smoker, diabetesStatus, allergies, allergyDescription, medication, medicationDescription]
  //   )
  //     .then(result => {
  //       res.status(201).json({ message: 'Record created', data: result.rows[0] });
  //     })
  //     .catch(error => {
  //       console.error('Error inserting record:', error);
  //       res.status(500).json({ message: 'Error creating record' });
  //     });
  // });

  // app.get('/patients', (req, res) => {
  //   db.query('SELECT * FROM patients')
  //     .then(results => {
  //       res.status(200).json(results.rows);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching patients:', error);
  //       res.status(500).json({ error: 'Database query failed' });
  //     });
  // });

  // app.get('/patient/:id/data', (req, res) => {
  //   const patientId = req.params.id;

  //   const recordsQuery = 'SELECT * FROM records WHERE patient_id = $1';
  //   const prescriptionsQuery = 'SELECT * FROM prescriptions WHERE patient_id = $1';
  //   const testsQuery = 'SELECT * FROM tests WHERE patient_id = $1';

  //   Promise.all([
  //     db.query(recordsQuery, [patientId]),
  //     db.query(prescriptionsQuery, [patientId]),
  //     db.query(testsQuery, [patientId]),
  //   ])
  //     .then(([recordsResult, prescriptionsResult, testsResult]) => {
  //       res.status(200).json({
  //         records: recordsResult.rows,
  //         prescriptions: prescriptionsResult.rows,
  //         tests: testsResult.rows,
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching patient data:', error);
  //       res.status(500).json({ error: 'Failed to fetch patient data' });
  //     });
  // });

  return app;
};
