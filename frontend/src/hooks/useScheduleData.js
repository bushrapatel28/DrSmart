import { useState, useEffect, useReducer } from "react";

export const ACTIONS = {
  SET_TIME_SLOT_DATA: "SET_TIME_SLOT_DATA",
  SCHEDULE_START_DATE_ADDED: "SCHEDULE_START_DATE_ADDED",
  SCHEDULE_END_DATE_ADDED: "SCHEDULE_END_DATE_ADDED",
  SCHEDULE_START_TIME_ADDED: "SCHEDULE_START_TIME_ADDED",
  SCHEDULE_END_TIME_ADDED: "SCHEDULE_END_TIME_ADDED",
  DATE_RANGE_ADDED: "DATE_RANGE_ADDED",
  TIME_SLOT_ID_RANGE_ADDED: "TIME_SLOT_ID_RANGE_ADDED",
  SELECTED_RANGE: "SELECTED_RANGE"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TIME_SLOT_DATA:
      return {...state, doctorInfo: action.payload};
    case ACTIONS.SCHEDULE_START_DATE_ADDED:
      return {...state, doctorInfo: null};
    case ACTIONS.SCHEDULE_END_DATE_ADDED:
      return {...state, showDoc: true};
    case ACTIONS.SCHEDULE_START_TIME_ADDED:
      return {...state, showDoc: false};
    case ACTIONS.SCHEDULE_END_TIME_ADDED:
      return {...state, isVirtual: action.payload};
    case ACTIONS.DATE_RANGE_ADDED:
      return {...state, appointmentType: action.payload};
    case ACTIONS.TIME_SLOT_ID_RANGE_ADDED:
      return {...state, startDate: action.payload};
    case ACTIONS.SELECTED_RANGE:
      return {...state, startDate: ""};
    default: 
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

const initialState = {
  timeSlots: [],
  docStartDate: null,
  docEndDate: null,
  docStartTime: null,
  docEndTime: null,
  dateRanges: [],
  timeSlotIdRanges: [],
  selectedRanges: []
}

const useScheduleData = () => {

  const [schedulerState, dispatch] = useReducer(reducer, initialState);
  
  const [docStartDate, setDocStartDate] = useState(null);
  const [docEndDate, setDocEndDate] = useState(null);

  const [docStartTime, setDocStartTime] = useState(null);
  const [docEndTime, setDocEndTime] = useState(null);

  const [dateRanges, setDateRanges] = useState([]);
  const [timeSlotIdRanges, setTimeSlotIdRanges] = useState([]);

  // Store the selected ranges
  const [selectedRanges, setSelectedRanges] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  
  useEffect(() => {
    fetch('/doctors/timeslots')
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

    // Add the selected range to the selectedRanges state
    setSelectedRanges(prev => [
      ...prev,
      {
        startDate: docStartDate,
        endDate: docEndDate,
        startTime: docStartTime,
        endTime: docEndTime
      }
    ]);

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

    const startTimeStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false});  // Converting to hh:mm:ss format for 24hrs
    const endTimeStr = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',  hour12: false});      // Converting to hh:mm:ss format for 24hrs
    
    timeSlots.map((timeSlot) => {
      if(timeSlot.end_time > startTimeStr && timeSlot.end_time <= endTimeStr) {         //Condition for getting only the ids of time slots which fall between the selected start time and end time
        console.log("MATCHED END", timeSlot.id);
        timeIds.push(timeSlot.id);          // Add the current timeSlotId to the array
      }
    })
    return timeIds;
  }  

  function saveSchedule() {
    setSelectedRanges([]);

    const scheduleData = {
      all_dates: dateRanges,
      vacant: true,
      all_time_slot_ids: timeSlotIdRanges
    };

    fetch("/doctors/:id/availability/new", {
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
        console.log("Availability added:", data);  // Handle the success response
      })
      .catch(error => {
        console.error("Error:", error);  // Handle any errors that occur
      });
    }

  function deleteAvailability(index) {
    console.log("SR", selectedRanges);
    console.log("RR", index);
    //Get the new selectedRanges by filtering out the range whose index matched the index of the range for which delete was clicked
    const updatedSelectedRanges = selectedRanges.filter((range, i) => i !== index);
    console.log("NEW", updatedSelectedRanges);
    const updatedDateRanges = dateRanges.filter((_, i) => i !== index);
    const updatedTimeSlotIdRanges = timeSlotIdRanges.filter((_, i) => i !== index);
  
    // Update the state for all three arrays
    setSelectedRanges(updatedSelectedRanges);
    setDateRanges(updatedDateRanges);
    setTimeSlotIdRanges(updatedTimeSlotIdRanges);
    
    // setAvailability();
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
    saveSchedule,
    selectedRanges,
    deleteAvailability
   };
}

export default useScheduleData;