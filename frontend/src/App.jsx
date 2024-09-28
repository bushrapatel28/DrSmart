import { useState } from 'react'
import './App.css'
import Appointment from './Appointment/Appointment'
import HomePage from './routes/HomePage/HomePage'
import RegistrationForm from './Registration/RegistrationForm'
import PatientsList from './PatientsList/PatientsList'

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
    </>
  )
}

export default App
