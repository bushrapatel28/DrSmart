import React from "react";

const AvailabilityList = (props) => {

  return (
    <div>
    {/* Display selected date and time ranges */}
      {props.selectedRanges.length > 0 && (
        <div>
          <h3>Selected Ranges:</h3>
          <ul>
            {props.selectedRanges.map((range, index) => (
              <div key={index}>
                <div>
                  {range.startDate.toDateString()} - {range.endDate ? range.endDate.toDateString() : range.startDate.toDateString()} 
                </div>
                <div>
                  {range.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {range.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
                <br />
                <button className="delete-btn" onClick={() => props.deleteAvailability(index)}>Delete</button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AvailabilityList;