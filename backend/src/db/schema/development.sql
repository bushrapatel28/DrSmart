INSERT INTO patients (name, email, password, profile_image, address, medical_history)
VALUES
  ('Sven Jones', 'jones.s@example.com', 'Ne3_PaT13nT', 'https://picsum.photos/200/300', '467 W 12th Ave, V8Y 3J7, Vancouver, BC', 'https://www.retention-project.eu/ig/Patient-P001.json.html'),
  ('Alice Smith', 'alice.smith@example.com', 'A1b2C3d4', 'https://picsum.photos/200/300', '123 Main St, A1B 2C3, Toronto, ON', 'https://www.retention-project.eu/ig/Patient-P002.json.html'),
  ('Robert Brown', 'robert.brown@example.com', 'R0b3rt_PaT13nT', 'https://picsum.photos/200/300', '456 Elm St, H2Y 3Z4, Montreal, QC', 'https://www.retention-project.eu/ig/Patient-P003.json.html'),
  ('Maria Garcia', 'maria.garcia@example.com', 'M4r14_PaT13nT', 'https://picsum.photos/200/300', '789 Maple Ave, K1A 0B1, Ottawa, ON', 'https://www.retention-project.eu/ig/Patient-P004.json.html'),
  ('James Johnson', 'james.johnson@example.com', 'J4m3s_PaT13nT', 'https://picsum.photos/200/300', '321 Pine St, R3M 4B5, Winnipeg, MB', 'https://www.retention-project.eu/ig/Patient-P005.json.html');

INSERT INTO doctors (name, email, password, profile_image, address, specialization)
VALUES
  ('Elizabeth Blackwell', 'blackwell.elizabeth@medicine.com', 'F1rst_D0ct0r', 'https://pixabay.com/illustrations/ai-generated-doctor-woman-people-8578393/', '123 Pioneer St, M5A 1A2, Toronto, ON', 'Gynecology'),
  ('Harvey Cushing', 'cushing.harvey@medicine.com', 'N3ur0_Surg3on', 'https://pixabay.com/illustrations/ai-generated-man-male-doctor-8795644/', '888 Brain Ln, T2P 3L8, Calgary, AB', 'Neurosurgery'),
  ('Florence Nightingale', 'nightingale.florence@medicine.com', 'L4mp_0f_Car3', 'https://pixabay.com/illustrations/ai-generated-woman-doctor-care-8578391/', '456 Lamp St, N1K 1K9, Guelph, ON', 'Nursing'),
  ('Joseph Lister', 'lister.joseph@medicine.com', 'Ant1_S3pt1c', 'https://pixabay.com/illustrations/ai-generated-man-doctor-clinical-8591733/', '321 Hygiene Rd, H2Y 2W8, Montreal, QC', 'Surgical Sterilization'),
  ('Clara Barton', 'barton.clara@medicine.com', 'R3dcR0ss_Fndr', 'https://pixabay.com/illustrations/ai-generated-woman-nurse-caregiver-8451341/', '555 Aid Ln, V8Z 1B2, Victoria, BC', 'Emergency Medicine'),
  ('William Osler', 'osler.william@medicine.com', 'M0d3rn_M3dic1ne', 'https://pixabay.com/illustrations/ai-generated-man-doctor-medical-8451270/', '222 Medicine Rd, B3K 3Z1, Halifax, NS', 'Internal Medicine'),
  ('Jean-Martin Charcot', 'charcot.jean@medicine.com', 'N3ur0l0g1st', 'https://pixabay.com/illustrations/ai-generated-man-doctor-medicine-8451277/', '778 Neurology Blvd, R2M 1X8, Winnipeg, MB', 'Neurology'),
  ('Christiaan Barnard', 'barnard.christiaan@medicine.com', 'H3art_Tr4nspl4nt', 'https://pixabay.com/illustrations/ai-generated-man-doctor-hospital-8655320/', '910 Surgery St, L2T 4Z7, St. Catharines, ON', 'Cardiothoracic Surgery'),
  ('Dorothy Andersen', 'andersen.dorothy@medicine.com', 'CfD1agn0sis', 'https://pixabay.com/illustrations/ai-generated-doctor-health-9019517/', '800 Diagnosis St, S7K 2J9, Saskatoon, SK', 'Pathology'),
  ('Charles Drew', 'drew.charles@medicine.com', 'B1ood_B4nk', 'https://pixabay.com/illustrations/ai-generated-doctor-male-health-9019518/', '900 Blood Bank Ave, E2L 4H8, Saint John, NB', 'Hematology');


INSERT INTO appointments (appointment_date, appointment_time, appointment_type, status, patient_id, doctor_id) 
VALUES 
    ('2024-09-25', '09:00:00', 'Checkup', 'Scheduled', 1, 1),
    ('2024-09-26', '10:30:00', 'Consultation', 'Completed', 2, 1),
    ('2024-09-27', '14:00:00', 'Follow-up', 'Cancelled', 3, 2),
    ('2024-09-28', '11:15:00', 'Immunization', 'Scheduled', 4, 3),
    ('2024-09-29', '16:00:00', 'Physical Therapy', 'Pending', 5, 2)
    ('2024-10-10', '08:00', 'Checkup', 'Pending', 1, 4),
    ('2024-10-10', '10:00', 'Consultation', 'Pending', 2, 4),
    ('2024-10-10', '14:00', 'Follow-up', 'Pending', 3, 7),
    ('2024-10-11', '09:00', 'Checkup', 'Pending', 1, 10),
    ('2024-10-11', '11:00', 'Consultation', 'Pending', 4, 4),
    ('2024-10-12', '08:00', 'Consultation', 'Pending', 3, 8),
    ('2024-10-12', '13:00', 'Follow-up', 'Pending', 5, 4),
    ('2024-10-13', '09:00', 'Checkup', 'Pending', 2, 6),
    ('2024-10-14', '08:00', 'Consultation', 'Pending', 1, 4),
    ('2024-10-14', '15:00', 'Follow-up', 'Pending', 2, 6),
    ('2024-10-15', '10:00', 'Checkup', 'Pending', 4, 5),
    ('2024-10-15', '14:00', 'Consultation', 'Pending', 7, 4),
    ('2024-10-16', '09:00', 'Follow-up', 'Pending', 3, 9),
    ('2024-10-17', '08:00', 'Consultation', 'Pending', 5, 4),
    ('2024-10-17', '16:00', 'Checkup', 'Pending', 3, 6);

INSERT INTO records (diagnosis, patient_id, doctor_id, appointment_id) 
VALUES 
    ('Flu', 1, 1, 1),
    ('Sprained Ankle', 2, 1, 2),
    ('Diabetes', 3, 2, 3),
    ('High Blood Pressure', 4, 3, 4),
    ('Allergies', 5, 2, 5);

INSERT INTO prescriptions (medicine, note, patient_id, doctor_id, record_id)
VALUES
  ('Amoxicillin', 'Take 500 mg every 8 hours for 7 days. Complete the full course, even if you feel better, to prevent antibiotic resistance.', 1, 2, 3),
  ('Lisinopril', 'Take 10 mg once daily. Monitor your blood pressure regularly, and do not stop taking it without consulting your doctor.', 2, 1, 4),
  ('Metformin', 'Start with 500 mg twice daily with meals. Gradually increase as directed. Maintain a balanced diet and regular exercise to manage your blood sugar.', 3, 4, 1),
  ('Simvastatin', 'Take 20 mg at bedtime. Combine with lifestyle changes such as a low-fat diet and exercise for best results.', 4, 5, 2),
  ('Sertraline', 'Take 50 mg once daily. Continue for at least 6 months for maximum benefit. Report any side effects to your doctor promptly.', 5, 3, 5);


INSERT INTO tests (name, result_url, patient_id, doctor_id, appointment_id, record_id) 
VALUES 
    ('Blood Test', 'http://example.com/results/blood_test_1', 1, 1, 1, 1),
    ('X-Ray', 'http://example.com/results/xray_1', 2, 1, 2, 2),
    ('MRI Scan', 'http://example.com/results/mri_1', 3, 2, 3, 3),
    ('Urine Test', 'http://example.com/results/urine_test_1', 4, 3, 4, 4),
    ('CT Scan', 'http://example.com/results/ct_scan_1', 5, 2, 5, 5);

INSERT INTO time_slots (start_time, end_time) VALUES
  ('06:00:00', '07:00:00'),
  ('07:00:00', '08:00:00'),
  ('08:00:00', '09:00:00'),
  ('09:00:00', '10:00:00'),
  ('10:00:00', '11:00:00'), 
  ('11:00:00', '12:00:00'),
  ('12:00:00', '13:00:00'),
  ('13:00:00', '14:00:00'),
  ('14:00:00', '15:00:00'),
  ('15:00:00', '16:00:00'),
  ('16:00:00', '17:00:00'),
  ('17:00:00', '18:00:00'),
  ('18:00:00', '19:00:00'),
  ('19:00:00', '20:00:00'),
  ('20:00:00', '21:00:00');
    
INSERT INTO availabilities (date, vacant, time_slot_id, doctor_id) VALUES
  ('2024-10-03', TRUE, 1, 1),
  ('2024-10-03', TRUE, 2, 1),
  ('2024-10-03', FALSE, 3, 1),
  ('2024-10-03', TRUE, 4, 2),
  ('2024-10-03', TRUE, 5, 2),
  ('2024-10-03', FALSE, 6, 2),

  ('2024-10-04', TRUE, 7, 3),
  ('2024-10-04', TRUE, 8, 3),
  ('2024-10-04', TRUE, 9, 4),
  ('2024-10-04', FALSE, 10, 5),

  ('2024-10-05', TRUE, 1, 1),
  ('2024-10-05', TRUE, 2, 2),
  ('2024-10-05', TRUE, 3, 3),
  ('2024-10-05', FALSE, 4, 4),

  ('2024-10-06', TRUE, 5, 5),
  ('2024-10-06', TRUE, 6, 1),
  ('2024-10-06', TRUE, 7, 2),
  ('2024-10-06', FALSE, 8, 3),
  
  ('2024-10-07', TRUE, 9, 4),
  ('2024-10-07', FALSE, 10, 5),

  ('2024-10-08', TRUE, 7, 1),
  ('2024-10-08', FALSE, 8, 2),
  ('2024-10-08', TRUE, 9, 3),
  ('2024-10-08', TRUE, 10, 3),

  ('2024-10-09', TRUE, 1, 1),
  ('2024-10-09', TRUE, 2, 1),
  ('2024-10-09', FALSE, 3, 1),
  ('2024-10-09', TRUE, 4, 2),

  ('2024-10-10', TRUE, 5, 2),
  ('2024-10-10', FALSE, 6, 2),
  ('2024-10-10', TRUE, 7, 3),
  ('2024-10-10', TRUE, 8, 3),

  ('2024-10-11', TRUE, 9, 4),
  ('2024-10-11', FALSE, 10, 5),

  ('2024-10-12', TRUE, 1, 1),
  ('2024-10-12', TRUE, 2, 1),
  ('2024-10-12', FALSE, 3, 1),
  ('2024-10-12', TRUE, 4, 2),

  ('2024-10-13', TRUE, 5, 2),
  ('2024-10-13', FALSE, 6, 2),
  ('2024-10-13', TRUE, 7, 3),
  ('2024-10-13', TRUE, 8, 3),

  ('2024-10-14', TRUE, 9, 4),
  ('2024-10-14', FALSE, 10, 5),

  ('2024-10-15', TRUE, 7, 1),
  ('2024-10-15', FALSE, 8, 2),
  ('2024-10-15', TRUE, 9, 3),
  ('2024-10-15', TRUE, 10, 3),

  ('2024-10-16', TRUE, 1, 1),
  ('2024-10-16', TRUE, 2, 1),
  ('2024-10-16', FALSE, 3, 1),
  ('2024-10-16', TRUE, 4, 2),

  ('2024-10-17', TRUE, 5, 2),
  ('2024-10-17', FALSE, 6, 2),
  ('2024-10-17', TRUE, 7, 3),
  ('2024-10-17', TRUE, 8, 3),

  ('2024-10-18', TRUE, 9, 4),
  ('2024-10-18', FALSE, 10, 5),

  ('2024-10-19', TRUE, 1, 1),
  ('2024-10-19', TRUE, 2, 1),
  ('2024-10-19', FALSE, 3, 1),
  ('2024-10-19', TRUE, 4, 2),

  ('2024-10-20', TRUE, 5, 2),
  ('2024-10-20', FALSE, 6, 2),
  ('2024-10-20', TRUE, 7, 3),
  ('2024-10-20', TRUE, 8, 3);

INSERT INTO notifications (patient_id, doctor_id, appointment_id, message)
VALUES 
  (1, 2, 1, 'Your appointment for October 15th at 1:30 PM has been scheduled.'),
  (2, 3, 2, 'Your appointment for October 16th at 10:00 AM has been canceled.'),
  (3, 4, 3, 'Your appointment for October 17th at 3:15 PM has been canceled.'),
  (4, 1, 4, 'Your appointment for October 18th at 11:45 AM has been scheduled.'),
  (5, 5, 5, 'Your appointment for October 19th at 2:00 PM has been scheduled.');