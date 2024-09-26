// import "./Registration.scss"
import React, { useState } from 'react';

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    unitLength: 'cm', // Default unit is centimeters
    unitWeigth: 'kg', // Default unit is kilograms
    diabetesStatus: 'No', // Default value for diabetes status
    allergies: '', // Tracks if allergies are Yes or No
    allergyDescription: '', // Description of allergies
    smoker: '', // Tracks if allergies are Yes or No
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAllergyChange = (value) => {
    setFormData({
      ...formData,
      allergies: value,
      // Clear description if No is selected
      allergyDescription: value === 'No' ? '' : formData.allergyDescription,
    });
  };

  const handleLengthChange = (e) => {
    const newUnit = e.target.value;
    let heightInCm;

    // Convert height to centimeters if switching to centimeters
    if (newUnit === 'cm') {
      heightInCm = formData.unitLength === 'in' ? (formData.height * 2.54).toFixed(2) : formData.height;
    }
    // Convert height to inches if switching to inches
    else {
      heightInCm = formData.unitLength === 'cm' ? (formData.height / 2.54).toFixed(2) : formData.height;
    }

    setFormData({
      ...formData,
      unitLength: newUnit,
      height: heightInCm,
    });
  };

  const handleWeightChange = (e) => {
    const newUnit = e.target.value;
    let weightInKg;

    // Convert height to centimeters if switching to centimeters
    if (newUnit === 'kg') {
      weightInKg = formData.unitWeigth === 'lb' ? (formData.weight * 0.45).toFixed(2) : formData.weight;
    }
    // Convert height to inches if switching to inches
    else {
      weightInKg = formData.unitWeigth === 'kg' ? (formData.weight / 0.45).toFixed(2) : formData.weight;
    }

    setFormData({
      ...formData,
      unitWeigth: newUnit,
      weight: weightInKg,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      height: '',
      unit: 'cm', // Reset unit to centimeters
      diabetesStatus: 'No', // Reset diabetes status
      allergies: '', // Reset allergies
      allergyDescription: '', // Reset allergy description
    });
  };

  return (
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
          <select name="unitLength" value={formData.unitLength} onChange={handleLengthChange}>
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
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="smoker"
              value="No"
              checked={formData.smoker === 'No'}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionForm;

