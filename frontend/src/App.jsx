import { useState } from 'react'
import './App.css'
import Appointment from './Appointment/Appointment'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Appointment />
    </>
  )
}

export default App
