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
                  {range.startTime.toLocaleTimeString()} - {range.endTime.toLocaleTimeString()}
                </div>
                <br />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AvailabilityList;