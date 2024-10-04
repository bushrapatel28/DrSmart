import './DoctorPatientsModal.scss';

const DoctorPatientsModal = ({ closePatientsModal, patientsList }) => {
  const records = patientsList.map((record, index) => (
    <tr key={index}>
      <td>{record.name}</td>
      <td>{record.email}</td>
      <td>{record.id}</td>
      <td>
        <a href={record.medical_history} target='_blank' rel='noopener noreferrer'>
          report.pdf
        </a>
      </td>
    </tr>
  ));

  return (
    <>
      <div className='top-nav-modal'>
        <div className='top-nav-modal__content'>
          <button className="top-nav-modal__close-button" onClick={closePatientsModal}>
            <span>&times;</span>
          </button>
          <h3 className="top-nav-modal__heading">
            Patient Records
          </h3>
          <table className='patient_list_table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>ID</th>
                <th>Medical File</th>
              </tr>
            </thead>
            <tbody>
              {records}
            </tbody>
          </table>
        </div>
      </div >
    </>
  );
};

export default DoctorPatientsModal;