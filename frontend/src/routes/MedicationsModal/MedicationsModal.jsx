import './MedicationModal.scss';

const MedicationModal = ({ patientMedications, closeMedicationsModal }) => {
  console.log("PATIENT MEDICATIONS WITHIN MODAL: ", patientMedications);
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <button className="modal__close-button" onClick={() => closeMedicationsModal()}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Your Medications</h3>

          {patientMedications && patientMedications.length > 0 ? (
            <ul className="modal__medication-list">
              {patientMedications.map((medicationObj, index) => (
                <li key={index} className="modal__medication-item">
                  <p>{medicationObj.medicine} - {medicationObj.note}</p>
                  <p><strong>Prescribed by:</strong> {medicationObj.doctor_name}</p>
                  <p><strong>Dated:</strong> {medicationObj.appointment_date.split('T')[0]}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medications available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicationModal;
