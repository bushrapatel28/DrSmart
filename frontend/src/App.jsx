import { useState } from 'react'
import './App.css'
import Appointment from './Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import PatientsList from './PatientsList/PatientsList'
import PatientMedicalData from './PatientMedicalData/PatientMedicalData'

function App() {
  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
  return (
    <>
      <Appointment />
      <HomePage />
      <RegistrationForm />
      <PatientsList />
      <PatientMedicalData />
    </>
  )
}

export default App
