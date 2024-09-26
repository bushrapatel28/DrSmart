import React, { useState } from 'react';

const useRegistrationData = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    unitHeigth: 'cm', // Default unit is centimeters
    unitWeigth: 'kg', // Default unit is kilograms
    diabetesStatus: 'No', // Default value for diabetes status
    allergies: '', // Tracks if allergies are Yes or No
    allergyDescription: '', // Description of allergies
    smoker: '', // Tracks if allergies are Yes or No
    medication: '', // Tracks if medication is Yes or No
    medicationDescription: '', // Description of medication
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

  const handleMedicationChange = (value) => {
    setFormData({
      ...formData,
      medication: value,
      // Clear description if No is selected
      medicationDescription: value === 'No' ? '' : formData.medicationDescription,
    });
  };

  const handleHeigthChange = (e) => {
    const newUnit = e.target.value;
    let heightInCm;

    // Convert height to centimeters if switching to centimeters
    if (newUnit === 'cm') {
      heightInCm = formData.unitHeigth === 'in' ? (formData.height * 2.54).toFixed(2) : formData.height;
    }
    // Convert height to inches if switching to inches
    else {
      heightInCm = formData.unitHeigth === 'cm' ? (formData.height / 2.54).toFixed(2) : formData.height;
    }

    setFormData({
      ...formData,
      unitHeigth: newUnit,
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
      weight: '',
      unitHeigth: 'cm',
      unitWeigth: 'kg',
      diabetesStatus: 'No',
      allergies: '',
      allergyDescription: '',
      smoker: '',
      medication: '',
      medicationDescription: ''
    });

    /*
    e.preventDefault();

    fetch('http://localhost:6000/patient/history/:id', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result.message); 
        setCurrentComponent('appointments')
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        // Reset the form data after submission
        setFormData({
          name: '',
          email: '',
          height: '',
          unit: 'cm',
          diabetesStatus: 'No',
          allergies: '',
          allergyDescription: '',
        });
      });
    */
  };

  return {
    formData,
    handleChange,
    handleAllergyChange,
    handleMedicationChange,
    handleHeigthChange,
    handleWeightChange,
    handleSubmit
  }
};

export default useRegistrationData;