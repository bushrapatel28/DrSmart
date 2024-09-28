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
          patientRecord.map(record => (
            <div key={record.id} className="modal__record-details">
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Appointment Number:</strong> {record.appointment_id}</p>
              <p><strong>Diagnosed by:</strong> Doctor {record.doctor_id}</p>
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
