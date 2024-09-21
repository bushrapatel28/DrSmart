DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS records CASCADE;
DROP TABLE IF EXISTS prescriptions CASCADE;
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS availabilities CASCADE;
DROP TABLE IF EXISTS time_slots CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

CREATE TABLE patients (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(60) NOT NULL,
  profile_image VARCHAR(255),
  address VARCHAR(255),
  medical_history VARCHAR(255)
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(60) NOT NULL,
  profile_image VARCHAR(255),
  address VARCHAR(255),
  specialization VARCHAR(255)
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  appointment_type VARCHAR(60) NOT NULL,
  status VARCHAR(60) NOT NULL,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE
);

CREATE TABLE records (
  id SERIAL PRIMARY KEY NOT NULL,
  diagnosis TEXT,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE
);

CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY NOT NULL,
  medicine VARCHAR(255),
  note TEXT,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
  record_id INTEGER REFERENCES records(id) ON DELETE CASCADE
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  result_url VARCHAR(255),
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
  record_id INTEGER REFERENCES records(id) ON DELETE CASCADE
);

CREATE TABLE time_slots (
  id SERIAL PRIMARY KEY NOT NULL,
  time_in_mins INTERVAL
);

CREATE TABLE availabilities (
  id SERIAL PRIMARY KEY NOT NULL,
  vacant BOOLEAN,
  date DATE,
  time_slot_id INTEGER REFERENCES time_slots(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE
);
