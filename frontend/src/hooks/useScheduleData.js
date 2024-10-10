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
      return {...state, timeSlots: action.payload};
    case ACTIONS.SCHEDULE_START_DATE_ADDED:
      return {...state, docStartDate: action.payload};
    case ACTIONS.SCHEDULE_END_DATE_ADDED:
      return {...state, docEndDate: action.payload};
    case ACTIONS.SCHEDULE_START_TIME_ADDED:
      return {...state, docStartTime: action.payload};
      case ACTIONS.SCHEDULE_END_TIME_ADDED:
      return {...state, docEndTime: action.payload};
    case ACTIONS.DATE_RANGE_ADDED:
      return {...state, dateRanges: action.payload};
    case ACTIONS.TIME_SLOT_ID_RANGE_ADDED:
      return {...state, timeSlotIdRanges: action.payload};
    case ACTIONS.SELECTED_RANGE:
      return {...state, selectedRanges: action.payload};
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

  // const [schedulerState, dispatch] = useReducer(reducer, initialState);
  
  // const [docStartDate, setDocStartDate] = useState(null);
  // const [docEndDate, setDocEndDate] = useState(null);

  // const [docStartTime, setDocStartTime] = useState(null);
  // const [docEndTime, setDocEndTime] = useState(null);

  // const [dateRanges, setDateRanges] = useState([]);
  // const [timeSlotIdRanges, setTimeSlotIdRanges] = useState([]);

  // // Store the selected ranges
  // const [selectedRanges, setSelectedRanges] = useState([]);

  // const [timeSlots, setTimeSlots] = useState([]);
  
  useEffect(() => {
    fetch('/doctors/timeslots')
    .then(res => res.json())
    .then(data => dispatch({type: ACTIONS.SET_TIME_SLOT_DATA, payload: data}))
    // .then(data => setTimeSlots(data))
  }, []);
  
  const datesOnChange = (dates) => {
    const [start, end] = dates;
    console.log("START", start);
    console.log("END", end);
    dispatch({type: ACTIONS.SCHEDULE_START_DATE_ADDED, payload: start})
    dispatch({type: ACTIONS.SCHEDULE_END_DATE_ADDED, payload: end})
    // setDocStartDate(start);
    // setDocEndDate(end);
  };

  const docStartTimeOnChange = (time) => {
    dispatch({type: ACTIONS.SCHEDULE_START_TIME_ADDED, payload: time})
    // setDocStartTime(time);
  };
  
  const docEndTimeOnChange = (time) => {
    dispatch({type: ACTIONS.SCHEDULE_END_TIME_ADDED, payload: time})
    // setDocEndTime(time);
  };
  
  function setAvailability() {
    console.log("S", schedulerState.docStartDate);
    console.log("E", schedulerState.docEndDate);
    console.log("T1", schedulerState.docStartTime);
    console.log("T2", schedulerState.docEndTime);
    
    const datesArray = getAllDatesBetween(schedulerState.docStartDate, schedulerState.docEndDate);
    const newDatesArray = [...schedulerState.dateRanges, { "dates": datesArray } ];
    dispatch({type: ACTIONS.DATE_RANGE_ADDED, payload: newDatesArray});
    // setDateRanges((prev) => [...prev, { "dates": datesArray }]);
    
    const timeIdsArray = getAllTimeIdsBetween(schedulerState.docStartTime, schedulerState.docEndTime);
    const newTimeIdsArray = [...schedulerState.timeSlotIdRanges, { "time_ids": timeIdsArray }];
    dispatch({type: ACTIONS.TIME_SLOT_ID_RANGE_ADDED, payload: newTimeIdsArray});
    // setTimeSlotIdRanges((prev) => [...prev, { "time_ids": timeIdsArray }]);
    
    // Add the selected range to the selectedRanges state
    const newSelections = [...schedulerState.selectedRanges, {
      startDate: schedulerState.docStartDate,
      endDate: schedulerState.docEndDate,
      startTime: schedulerState.docStartTime,
      endTime: schedulerState.docEndTime
    }];
    dispatch({type: ACTIONS.SELECTED_RANGE, payload: newSelections});
    // setSelectedRanges(prev => [
      //   ...prev,
      //   {
        //     startDate: docStartDate,
        //     endDate: docEndDate,
        //     startTime: docStartTime,
        //     endTime: docEndTime
      //   }
      // ]);
      
    dispatch({type: ACTIONS.SCHEDULE_START_TIME_ADDED, payload: null})
    dispatch({type: ACTIONS.SCHEDULE_END_TIME_ADDED, payload: null})
    // setDocStartTime(null);
    // setDocEndTime(null);
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
    
    schedulerState.timeSlots.map((timeSlot) => {
      if(timeSlot.end_time > startTimeStr && timeSlot.end_time <= endTimeStr) {         //Condition for getting only the ids of time slots which fall between the selected start time and end time
        console.log("MATCHED END", timeSlot.id);
        timeIds.push(timeSlot.id);          // Add the current timeSlotId to the array
      }
    })
    return timeIds;
  }  
  
  function saveSchedule() {
    dispatch({type: ACTIONS.SELECTED_RANGE, payload: []});
    // setSelectedRanges([]);

    const scheduleData = {
      all_dates: schedulerState.dateRanges,
      vacant: true,
      all_time_slot_ids: schedulerState.timeSlotIdRanges
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
    console.log("SR", schedulerState.selectedRanges);
    console.log("RR", index);
    //Get the new selectedRanges by filtering out the range whose index matched the index of the range for which delete was clicked
    const updatedSelectedRanges = schedulerState.selectedRanges.filter((range, i) => i !== index);
    console.log("NEW", updatedSelectedRanges);
    const updatedDateRanges = schedulerState.dateRanges.filter((_, i) => i !== index);
    const updatedTimeSlotIdRanges = schedulerState.timeSlotIdRanges.filter((_, i) => i !== index);
  
    // Update the state for all three arrays
    dispatch({type: ACTIONS.SELECTED_RANGE, payload: updatedSelectedRanges});
    dispatch({type: ACTIONS.DATE_RANGE_ADDED, payload: updatedDateRanges});
    dispatch({type: ACTIONS.TIME_SLOT_ID_RANGE_ADDED, payload: updatedTimeSlotIdRanges});
    // setSelectedRanges(updatedSelectedRanges);
    // setDateRanges(updatedDateRanges);
    // setTimeSlotIdRanges(updatedTimeSlotIdRanges);
    
    // setAvailability();
  }

  return { 
    schedulerState,
    // docStartDate,
    // docEndDate,
    // docStartTime,
    // docEndTime,
    datesOnChange,
    docStartTimeOnChange,
    docEndTimeOnChange,
    setAvailability,
    saveSchedule,
    // selectedRanges,
    deleteAvailability
   };
}

export default useScheduleData;