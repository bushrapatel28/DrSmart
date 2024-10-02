import { useState, useEffect } from "react";

const useScheduleData = () => {
  const [docStartDate, setDocStartDate] = useState(null);
  const [docEndDate, setDocEndDate] = useState(null);

  const [docStartTime, setDocStartTime] = useState(null);
  const [docEndTime, setDocEndTime] = useState(null);

  const [dateRanges, setDateRanges] = useState([]);
  const [timeSlotIdRanges, setTimeSlotIdRanges] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  
  useEffect(() => {
    fetch('/doctor/timeslots')
    .then(res => res.json())
    .then(data => setTimeSlots(data))
  }, []);
  

  const datesOnChange = (dates) => {
    const [start, end] = dates;
    console.log("START", start);
    console.log("END", end);
    setDocStartDate(start);
    setDocEndDate(end);
  };

  const docStartTimeOnChange = (time) => {
    setDocStartTime(time);
  };

  const docEndTimeOnChange = (time) => {
    setDocEndTime(time);
  };

  function setAvailability() {
    console.log("S", docStartDate);
    console.log("E", docEndDate);
    console.log("T1", docStartTime);
    console.log("T2", docEndTime);

    const datesArray = getAllDatesBetween(docStartDate, docEndDate);
    setDateRanges((prev) => [...prev, { "dates": datesArray }]);
    
    const timeIdsArray = getAllTimeIdsBetween(docStartTime, docEndTime);
    setTimeSlotIdRanges((prev) => [...prev, { "time_ids": timeIdsArray }]);

    setDocStartTime(null);
    setDocEndTime(null);
  }
  
  const getAllDatesBetween = (startDate, endDate) => {
    const dates = [];

    // Add just 1 day
    if(!endDate) {
      endDate = startDate;
    }

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));  // Add the current date to the array
      currentDate.setDate(currentDate.getDate() + 1);   // Increment by 1 day
    }

    return dates;
  };

  const getAllTimeIdsBetween = (startTime, endTime) => {
    const timeIds = [];

    timeSlots.map((timeSlot) => {
      if(timeSlot.end_time > startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false}) && timeSlot.end_time <= endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false})) {
        console.log("MATCHED END", timeSlot.id);
        timeIds.push(timeSlot.id);
      }
    })

    return timeIds;
  }  

  function saveSchedule() {
    const scheduleData = {
      dates: dateRanges,
      vacant: true,
      time_slot_ids: timeSlotIdRanges,
      doctor_id: 4
    };

    fetch("/doctor/:id/availability/new", {
      method: "POST",                         // Set method to POST
      headers: {
        "Content-Type": "application/json",  // Specify the content type as JSON
      },
      body: JSON.stringify(scheduleData)  // Convert the data to JSON format 

    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();          // Parse the JSON response
      })
      .then(data => {
        console.log("Availability created:", data);  // Handle the success response
      })
      .catch(error => {
        console.error("Error:", error);  // Handle any errors that occur
      });
  }

  return { 
    docStartDate,
    docEndDate,
    docStartTime,
    docEndTime,
    datesOnChange,
    docStartTimeOnChange,
    docEndTimeOnChange,
    setAvailability,
    saveSchedule
   };
}

export default useScheduleData;