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
const patient_medical_history = require("./routes/patientMedicalHistory");
const visits = require('./routes/visits');
const messages = require('./routes/messages');
const medications = require('./routes/medications');
const labresults = require('./routes/lab-results');
const schedule = require('./routes/schedule');
const visit_form =  require('./routes/visit-form');
const doc_messages = require('./routes/doc-messages');

//Zoom Video Setup
const video_call = require('./routes/video-call');
// const middleware = require('./routes/middleware');

// article scrapping for AI suggestions
const article_scrape = require('./routes/article-scrape');

// app.use(express.json());

// app.post('/generate', middleware.generateToken, (req, res) => {
//   console.log("APPLICATION REQ", req.body);
//   console.log("APPLICATION SIGN", res.locals.signature);
//   res.status(200).json({signature: res.locals.signature});
// });


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
  app.use("/patient", patient_medical_history(db));
  app.use('/patient', visits(db));
  app.use('/patient', messages(db));
  app.use('/patient', medications(db));
  app.use('/patient', labresults(db));

  app.use('/doctors', schedule(db));
  app.use('/doctors', visit_form(db));
  app.use('/doctors', doc_messages(db));

  app.use('/', video_call());
  app.use('/api', article_scrape());

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

  return app;
};
