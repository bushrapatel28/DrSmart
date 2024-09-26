// import "./Registration.scss"
import React, { useState } from 'react';
import useRegistrationData from '../hooks/useRegistrationData';

const RegistrationForm = () => {
  const {
    formData,
    handleChange,
    handleAllergyChange,
    handleMedicationChange,
    handleHeigthChange,
    handleWeightChange,
    handleSubmit
  } = useRegistrationData();

  return (
    <div className='patient_medical_record'>
      <h2>Personal and Medical Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Height:
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
          <label>
            Weight:
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
          <label>Do you smoke?</label>
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
          <label>
            Are you diabetic?
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
          <label>Allergies?</label>
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
          <label>
            Please describe:
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
          <label>Any ongoing medication?</label>
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
          <label>
            Please describe:
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
  );
};

export default RegistrationForm;

