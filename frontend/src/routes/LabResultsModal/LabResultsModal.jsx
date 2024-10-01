import './LabResultsModal.scss';

const LabResultsModal = ({ patientLabResults, closeLabResultsModal }) => {
  console.log("LAB RESULTS WITHIN MODAL: ", patientLabResults);
  
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <button className="modal__close-button" onClick={closeLabResultsModal}>
            <span>&times;</span>
          </button>
          <h3 className="modal__heading">Lab Results</h3>

          {patientLabResults && patientLabResults.length > 0 ? (
            <ul className="modal__list">
              {patientLabResults.map((result, index) => (
                <li key={index} className="modal__list-item">
                  Test: {result.test_name} | Doctor: {result.doctor_name} | 
                  <a href={result.result_url} target="_blank" rel="noopener noreferrer">View Result</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No lab results available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LabResultsModal;
