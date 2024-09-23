INSERT INTO appointments (appointment_date, appointment_time, appointment_type, status, patient_id, doctor_id) 
VALUES 
    ('2024-09-25', '09:00:00', 'Checkup', 'Scheduled', 1, 1),
    ('2024-09-26', '10:30:00', 'Consultation', 'Completed', 2, 1),
    ('2024-09-27', '14:00:00', 'Follow-up', 'Cancelled', 3, 2),
    ('2024-09-28', '11:15:00', 'Immunization', 'Scheduled', 4, 3),
    ('2024-09-29', '16:00:00', 'Physical Therapy', 'Pending', 5, 2);


INSERT INTO records (diagnosis, patient_id, doctor_id, appointment_id) 
VALUES 
    ('Flu', 1, 1, 1),
    ('Sprained Ankle', 2, 1, 2),
    ('Diabetes', 3, 2, 3),
    ('High Blood Pressure', 4, 3, 4),
    ('Allergies', 5, 2, 5);

INSERT INTO tests (name, result_url, patient_id, doctor_id, appointment_id, record_id) 
VALUES 
    ('Blood Test', 'http://example.com/results/blood_test_1', 1, 1, 1, 1),
    ('X-Ray', 'http://example.com/results/xray_1', 2, 1, 2, 2),
    ('MRI Scan', 'http://example.com/results/mri_1', 3, 2, 3, 3),
    ('Urine Test', 'http://example.com/results/urine_test_1', 4, 3, 4, 4),
    ('CT Scan', 'http://example.com/results/ct_scan_1', 5, 2, 5, 5);

INSERT INTO time_slots (start_time, end_time) VALUES
  ('09:00:00', '10:00:00'),
  ('10:00:00', '11:00:00'),
  ('11:00:00', '12:00:00'),
  ('12:00:00', '13:00:00'),
  ('13:00:00', '14:00:00'),
  ('14:00:00', '15:00:00'),
  ('15:00:00', '16:00:00'),
  ('16:00:00', '17:00:00'),
  ('17:00:00', '18:00:00'),
  ('18:00:00', '19:00:00');
    
INSERT INTO availabilities (date, vacant, time_slot_id, doctor_id) VALUES
  ('2024-09-25', TRUE, 1, 1),
  ('2024-09-25', TRUE, 2, 1),
  ('2024-09-25', FALSE, 3, 1),
  ('2024-09-25', TRUE, 4, 2),
  ('2024-09-25', TRUE, 5, 2),
  ('2024-09-25', FALSE, 6, 2),
  ('2024-09-25', TRUE, 7, 3),
  ('2024-09-25', TRUE, 8, 3),
  ('2024-09-25', TRUE, 9, 4),
  ('2024-09-25', FALSE, 10, 5),

  ('2024-09-26', TRUE, 1, 1),
  ('2024-09-26', TRUE, 2, 2),
  ('2024-09-26', TRUE, 3, 3),
  ('2024-09-26', FALSE, 4, 4),
  ('2024-09-26', TRUE, 5, 5),
  ('2024-09-26', TRUE, 6, 1),
  ('2024-09-26', TRUE, 7, 2),
  ('2024-09-26', FALSE, 8, 3),
  ('2024-09-26', TRUE, 9, 4),
  ('2024-09-26', TRUE, 10, 5);
