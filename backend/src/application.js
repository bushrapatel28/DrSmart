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

  app.use("/patient", appointments(db));
  app.use("/api", doctors(db));


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

  app.close = function() {
    return db.end();
  };

  return app;
};
