import './MedicalHistoryModal.scss';
import React, { useState } from 'react';
import useRegistrationData from '../../hooks/useRegistrationData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MedicalHistoryModal = ({ closeMedicalHistoryModal, openProfile }) => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call handleSubmit to perform the fetch request
    handleSubmit(e) // Call handleSubmit which returns a promise
      .then(() => {
        // Close the modal and open the user profile after the fetch completes
        closeMedicalHistoryModal();
      })
      .catch((error) => {
        console.error('Error during submission:', error);
        // Optionally handle the error, e.g., show a message to the user
      });
  };

  const adjustHeight = (e) => {
    e.target.style.height = 'auto'; // Reset the height to auto to calculate new height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set to the scroll height
  };

  return (
    <>
      <div className="medical-history-modal">
        <div className="medical-history-modal__content">
          <button className="medical-history-modal__close-button" onClick={() => closeMedicalHistoryModal()}>
            <span>&times;</span>
          </button>
          <h1 className="medical-history-modal__heading">Personal and Medical Record</h1>
          <form className="medical-history-modal__msg-list" onSubmit={handleFormSubmit}>
            <div className="medical-history-modal__record-details">
              <label>
                <p><strong>Date of Birth:</strong></p>
                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy" // Specify the desired date format
                  placeholderText="DD/MM/YYYY" // Placeholder text
                  className="date-of-birth"
                />
              </label>
            </div>
            <div className="medical-history-modal__record-details">
              <label>
                <p><strong>Height:</strong></p>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
                <select className="drop-box" name="unitHeigth" value={formData.unitHeigth} onChange={handleHeigthChange}>
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </label>
            </div>
            <div className="medical-history-modal__record-details">
              <label>
                <p><strong>Weight:</strong></p>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
                <select className="drop-box" name="unitWeigth" value={formData.unitWeigth} onChange={handleWeightChange}>
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </label>
            </div>
            <div className="medical-history-modal__record-details">
              <label><p><strong>Do you smoke?</strong></p></label>
              <div>
                <label className="check-box">
                  <input
                    type="radio"
                    name="smoker"
                    value="Yes"
                    checked={formData.smoker === 'Yes'}
                    onChange={handleChange}
                  />
                  <span class="radio-mark"></span>
                  Yes
                </label>
                <label className="check-box">
                  <input
                    type="radio"
                    name="smoker"
                    value="No"
                    checked={formData.smoker === 'No'}
                    onChange={handleChange}
                  />
                  <span class="radio-mark"></span>
                  No
                </label>
              </div>
            </div>
            <div className="medical-history-modal__record-details">
              <label>
                <p><strong>Are you diabetic?</strong></p>
                <select className='drop-box'
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
            <div className="medical-history-modal__record-details">
              <label><p><strong>Allergies?</strong></p></label>
              <div>
                <label className="check-box">
                  <input
                    type="radio"
                    name="allergies"
                    value="Yes"
                    checked={formData.allergies === 'Yes'}
                    onChange={() => handleAllergyChange('Yes')}
                  />
                  <span class="radio-mark"></span>
                  Yes
                </label>
                <label className="check-box">
                  <input
                    type="radio"
                    name="allergies"
                    value="No"
                    checked={formData.allergies === 'No'}
                    onChange={() => handleAllergyChange('No')}
                  />
                  <span class="radio-mark"></span>
                  No
                </label>
              </div>

              <div>
                <label className='description'>
                  <p><strong>Please describe:</strong></p>
                  <textarea
                    type="text"
                    name="allergyDescription"
                    value={formData.allergyDescription}
                    onChange={handleChange}
                    // Enable textarea only if Yes is selected
                    disabled={formData.allergies !== 'Yes'}
                  />
                </label>
              </div>
            </div>
            <div className="medical-history-modal__record-details">
              <label><p><strong>Any ongoing medication?</strong></p></label>
              <div>
                <label className="check-box">
                  <input
                    type="radio"
                    name="medication"
                    value="Yes"
                    checked={formData.medication === 'Yes'}
                    onChange={() => handleMedicationChange('Yes')}
                  />
                  <span class="radio-mark"></span>
                  Yes
                </label>
                <label className="check-box">
                  <input
                    type="radio"
                    name="medication"
                    value="No"
                    checked={formData.medication === 'No'}
                    onChange={() => handleMedicationChange('No')}
                  />
                  <span class="radio-mark"></span>
                  No
                </label>
              </div>
              <div>
                <label className='description'>
                  <p><strong>Please describe:</strong></p>
                  <textarea
                    type="text"
                    name="medicationDescription"
                    value={formData.medicationDescription}
                    onChange={handleChange}
                    onInput={adjustHeight} // Call adjustHeight on input
                    // Enable textarea only if Yes is selected
                    disabled={formData.medication !== 'Yes'}
                  />
                </label>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MedicalHistoryModal;