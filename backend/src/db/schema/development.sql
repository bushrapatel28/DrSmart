INSERT INTO patients (name, email, password, profile_image, address, medical_history)
VALUES
  ('Sven Jones', 'jones.s@example.com', 'Ne3_PaT13nT', 'https://picsum.photos/200/300', '467 W 12th Ave, V8Y 3J7, Vancouver, BC', 'https://www.retention-project.eu/ig/Patient-P001.json.html'),
  ('Alice Smith', 'alice.smith@example.com', 'A1b2C3d4', 'https://picsum.photos/200/300', '123 Main St, A1B 2C3, Toronto, ON', 'https://www.retention-project.eu/ig/Patient-P002.json.html'),
  ('Robert Brown', 'robert.brown@example.com', 'R0b3rt_PaT13nT', 'https://picsum.photos/200/300', '456 Elm St, H2Y 3Z4, Montreal, QC', 'https://www.retention-project.eu/ig/Patient-P003.json.html'),
  ('Maria Garcia', 'maria.garcia@example.com', 'M4r14_PaT13nT', 'https://picsum.photos/200/300', '789 Maple Ave, K1A 0B1, Ottawa, ON', 'https://www.retention-project.eu/ig/Patient-P004.json.html'),
  ('James Johnson', 'james.johnson@example.com', 'J4m3s_PaT13nT', 'https://picsum.photos/200/300', '321 Pine St, R3M 4B5, Winnipeg, MB', 'https://www.retention-project.eu/ig/Patient-P005.json.html');

  INSERT INTO doctors (name, email, password, profile_image, address, specialization)
VALUES
  ('Edward Jenner', 'jenner.edward@medicine.com', 'VaC-C1n35', 'https://picsum.photos/200/300', '5678 E 49th Ave, V6K 9P5, Vancouver, BC', 'Pediatrics'),
  ('Marie Curie', 'curie.marie@medicine.com', 'R4di0_AcT1v3', 'https://picsum.photos/200/300', '123 Science Blvd, H2X 3Y7, Montreal, QC', 'Radiology'),
  ('Paul Farmer', 'farmer.paul@medicine.com', 'C0mmuN1ty_Car3', 'https://picsum.photos/200/300', '789 Global St, K1N 5T5, Ottawa, ON', 'Public Health'),
  ('Virginia Apgar', 'apgar.virginia@medicine.com', 'S1gN_4_Lif3', 'https://picsum.photos/200/300', '456 Care Rd, R3M 4B5, Winnipeg, MB', 'Anesthesiology'),
  ('Atul Gawande', 'gawande.atul@medicine.com', 'Ch3ckl1st_Sav3', 'https://picsum.photos/200/300', '321 Healthway, V5K 1A1, Calgary, AB', 'General Surgery');

  INSERT INTO prescriptions (medicine, note, patient_id, doctor_id, record_id)
VALUES
  ('Amoxicillin', 'Take 500 mg every 8 hours for 7 days. Complete the full course, even if you feel better, to prevent antibiotic resistance.', 1, 2, 3),
  ('Lisinopril', 'Take 10 mg once daily. Monitor your blood pressure regularly, and do not stop taking it without consulting your doctor.', 2, 1, 4),
  ('Metformin', 'Start with 500 mg twice daily with meals. Gradually increase as directed. Maintain a balanced diet and regular exercise to manage your blood sugar.', 3, 4, 1),
  ('Simvastatin', 'Take 20 mg at bedtime. Combine with lifestyle changes such as a low-fat diet and exercise for best results.', 4, 5, 2),
  ('Sertraline', 'Take 50 mg once daily. Continue for at least 6 months for maximum benefit. Report any side effects to your doctor promptly.', 5, 3, 5);

INSERT INTO notifications (patient_id, doctor_id, appointment_id, message)
VALUES 
  (1, 2, 1, 'Your appointment for October 15th at 1:30 PM has been scheduled.'),
  (2, 3, 2, 'Your appointment for October 16th at 10:00 AM has been canceled.'),
  (3, 4, 3, 'Your appointment for October 17th at 3:15 PM has been canceled.'),
  (4, 1, 4, 'Your appointment for October 18th at 11:45 AM has been scheduled.'),
  (5, 5, 5, 'Your appointment for October 19th at 2:00 PM has been scheduled.');