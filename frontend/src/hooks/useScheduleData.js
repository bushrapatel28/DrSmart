import { useState, useEffect } from "react";

const useScheduleData = () => {
  const [docStartDate, setDocStartDate] = useState(new Date());
  const [docEndDate, setDocEndDate] = useState(null);

  const [docStartTime, setDocStartTime] = useState(new Date());
  const [docEndTime, setDocEndTime] = useState(new Date());

  const [timeRange, setTimeRange] = useState([{}]);

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
  }, [timeRange, docStartDate, docEndDate]);

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
    setAvailability
   };
}

export default useScheduleData;