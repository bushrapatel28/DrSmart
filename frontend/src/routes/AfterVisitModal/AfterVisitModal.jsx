import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from 'date-fns';

const AfterVisitModal = ({ isOpen, closeModal, formData, handleInputChange, handleSubmit, selectDateTime, filterPassedTime, patients }) => {
  // if (!isOpen) return null;
  console.log("***********Patient's data in modal: ***********", patients);
  return (
    <>
    {isOpen && (
          <div className="modal">
          <div className="modal__content">
            <button className="modal__close-button" onClick={closeModal}>
              <span>&times;</span>
            </button>
            <h3 className="modal__heading">After Visit Summary</h3>
    
            <DatePicker
              inline
              selected={formData.appointmentDateTime}
              onChange={(date) => selectDateTime(date)}
              showTimeSelect
              timeIntervals={30}
              timeCaption="Time"
              filterTime={filterPassedTime}
              dateFormat="Pp"  // Display both date and time
              minDate={new Date()}  // Only allow dates starting from today
              maxDate={new Date()}
              minTime={formData.appointmentDateTime && formData.appointmentDateTime.toDateString() === new Date().toDateString()
                ? new Date() > setHours(setMinutes(new Date(), 0), 6)
                  ? new Date()
                  : setHours(setMinutes(new Date(), 0), 6)
                : setHours(setMinutes(new Date(), 0), 6)}
              maxTime={setHours(setMinutes(new Date(), 30), 20)}
            />
    
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="modal__appointment-date"
                  readOnly
                  name="date"
                  value={formData.appointmentDateTime ? formData.appointmentDateTime.toDateString() : ""}
                  required
                />
                <input
                  className="appointment-time"
                  readOnly
                  name="time"
                  value={formData.appointmentDateTime ? formData.appointmentDateTime.toLocaleTimeString() : ""}
                  required
                />
    
                {/* Patient Dropdown */}
                <label htmlFor="patientId">Select Patient:</label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                {formData.errors.patientId && <p className="error">{formData.errors.patientId}</p>}
              </div>
    
              <div>
                <label htmlFor="diagnosis">Diagnosis:</label>
                <textarea
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  name="diagnosis"
                  required
                />
                {formData.errors.diagnosis && <p className="error">{formData.errors.diagnosis}</p>}
              </div>
    
              <div>
                <label htmlFor="tests">Tests:</label>
                <textarea
                  id="tests"
                  value={formData.tests}
                  onChange={handleInputChange}
                  name="tests"
                />
              </div>
    
              {/* Prescription fields: Medicine and Dosage */}
              <div>
                <label htmlFor="medicine">Medicine:</label>
                <input
                  id="medicine"
                  value={formData.medicine}
                  onChange={handleInputChange}
                  name="medicine"
                  required
                />
                {formData.errors.medicine && <p className="error">{formData.errors.medicine}</p>}
              </div>
    
              <div>
                <label htmlFor="dosage">Dosage/Notes:</label>
                <input
                  id="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  name="dosage"
                  required
                />
                {formData.errors.dosage && <p className="error">{formData.errors.dosage}</p>}
              </div>
    
              <button type="submit">Submit Summary</button>
            </form>
          </div>
        </div>
    )}
    </>

  );
};

export default AfterVisitModal;
