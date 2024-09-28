import { useState, useEffect } from "react";

const useDoctorsData = () => {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctor(data))
  }, []);

  return { doctor };
}

export default useDoctorsData;