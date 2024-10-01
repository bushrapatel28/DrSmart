import './RecordDetailsModal.scss';

const RecordDetailsModal = ({ patientRecord, closeRecordModal }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close-button" onClick={() => closeRecordModal()}>
          <span>&times;</span>
        </button>
        <h3 className="modal__heading">Details of your previous visits</h3>
        
        {patientRecord && patientRecord.length > 0 ? (
          patientRecord.map((record, index) => (
            <div key={index} className="modal__record-details">
              <p><strong>Appointment Date:</strong> {record.appointment_date.split('T')[0]}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Diagnosed by:</strong> Doctor {record.doctor_name}</p>
              {record.prescribed_medication && <p><strong>Given Medication:</strong> {record.prescribed_medication}</p>}
              {record.suggested_tests && <p><strong>Tests:</strong> {record.suggested_tests}</p>}
            </div>
          ))
        ) : (
          <p>No records available for this patient.</p>
        )}
      </div>
    </div>
  );
};

export default RecordDetailsModal;
