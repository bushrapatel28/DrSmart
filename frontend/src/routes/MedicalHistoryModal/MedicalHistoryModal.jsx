import './MedicalHistoryModal.scss';
import React, { useState } from 'react';
import useRegistrationData from '../../hooks/useRegistrationData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MedicalHistoryModal = ({ closeMedicalHistoryModal }) => {
  const {
    formData,
    handleDateChange,
    handleChange,
    handleAllergyChange,
    handleMedicationChange,
    handleHeigthChange,
    handleWeightChange,
    handleSubmit
  } = useRegistrationData();

  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <button className="modal__close-button" onClick={() => closeMedicalHistoryModal()}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Personal and Medical Record</h3>
          <form className="modal__msg-list" onSubmit={handleSubmit}>
            <div>
              <label className="modal__record-details">
                <p><strong>Date of Birth:</strong></p>
                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy" // Specify the desired date format
                  placeholderText="DD/MM/YYYY" // Placeholder text
                />
              </label>
            </div>
            <div>
              <label className="modal__record-details">
                <p><strong>Height:</strong></p>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
                <select name="unitHeigth" value={formData.unitHeigth} onChange={handleHeigthChange}>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </label>
            </div>
            <div>
              <label className="modal__record-details">
                <p><strong>Weight:</strong></p>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
                <select name="unitWeigth" value={formData.unitWeigth} onChange={handleWeightChange}>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </label>
            </div>
            <div>
              <label className="modal__record-details"><p><strong>Do you smoke?</strong></p></label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="smoker"
                    value="Yes"
                    checked={formData.smoker === 'Yes'}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="smoker"
                    value="No"
                    checked={formData.smoker === 'No'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="modal__record-details">
                <p><strong>Are you diabetic?</strong></p>
                <select
                  name="diabetesStatus"
                  value={formData.diabetesStatus}
                  onChange={handleChange}
                >
                  <option value="No">No</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                </select>
              </label>
            </div>
            <div>
              <label className="modal__record-details"><p><strong>Allergies?</strong></p></label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="allergies"
                    value="Yes"
                    checked={formData.allergies === 'Yes'}
                    onChange={() => handleAllergyChange('Yes')}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="allergies"
                    value="No"
                    checked={formData.allergies === 'No'}
                    onChange={() => handleAllergyChange('No')}
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="modal__record-details">
                <p><strong>Please describe:</strong></p>
                <input
                  type="text"
                  name="allergyDescription"
                  value={formData.allergyDescription}
                  onChange={handleChange}
                  // Enable input only if Yes is selected
                  disabled={formData.allergies !== 'Yes'}
                />
              </label>
            </div>
            <div>
              <label className="modal__record-details"><p><strong>Any ongoing medication?</strong></p></label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="medication"
                    value="Yes"
                    checked={formData.medication === 'Yes'}
                    onChange={() => handleMedicationChange('Yes')}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="medication"
                    value="No"
                    checked={formData.medication === 'No'}
                    onChange={() => handleMedicationChange('No')}
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="modal__record-details">
                <p><strong>Please describe:</strong></p>
                <input
                  type="text"
                  name="medicationDescription"
                  value={formData.medicationDescription}
                  onChange={handleChange}
                  // Enable input only if Yes is selected
                  disabled={formData.medication !== 'Yes'}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MedicalHistoryModal;