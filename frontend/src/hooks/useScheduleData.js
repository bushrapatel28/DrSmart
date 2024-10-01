import { useState, useEffect } from "react";

const useScheduleData = () => {
  const [docStartDate, setDocStartDate] = useState(new Date());
  const [docEndDate, setDocEndDate] = useState(null);

  const [docStartTime, setDocStartTime] = useState(new Date());
  const [docEndTime, setDocEndTime] = useState(new Date());

  const [timeRange, setTimeRange] = useState([]);

  const docOnChange = (dates) => {
    const [start, end] = dates;
    setDocStartDate(start);
    setDocEndDate(end);
  };

  function setAvailability() {
    setTimeRange((prev) => [...prev, {"start_time": docStartTime, "end_time": docEndTime}]);
  }
  
  
  // Use useEffect to log the updated timeRange after it changes
  useEffect(() => {
    console.log("S", docStartDate);
    console.log("E", docEndDate);
    console.log("T", timeRange);

    const time_id = [];

    for (const sT of timeRange) {
      console.log(`Input before ${sT.start_time}`);
      
      for (const slot of timeSlots) {
        if (slot.start_time === sT.start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false})) {
          time_id.push(slot.id);
          console.log(time_id);
          
          if(slot.end_time === sT.end_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false})) {
            break;
          } else {
            for (const slot2 of timeSlots) {
              if (slot2.end_time > slot.end_time) {
                
                time_id.push(slot2.id);

                if(slot2.end_time === sT.end_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false})) {
                  break;
                }
                console.log("End", time_id);
              }
            }
          }
        }        
      }
      

    }
  }, [timeRange, docStartDate, docEndDate]);


  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetch('/doctor/timeslots')
      .then(res => res.json())
      .then(data => setTimeSlots(data))
  }, []);

  function add() {

    const scheduleData = {
      date: [docStartDate, docEndDate],
      vacant: true,
      time_slot_id: 1,
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
    setDocStartDate,
    docEndDate,
    setDocEndDate,
    docStartTime,
    setDocStartTime,
    docEndTime,
    setDocEndTime,
    docOnChange,
    setAvailability,
    timeSlots,
    add
   };
}

export default useScheduleData;