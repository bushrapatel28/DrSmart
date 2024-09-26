import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './Registration/RegistrationForm'

function App() {
  const [count, setCount] = useState(0)

  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
};

return (
  <div>
    <h1>Hello</h1>
    <RegistrationForm />
  </div>
)

export default App
