import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registration from './Registration/Registration'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello</h1>
      <Registration />
    </div>
  )
}

export default App
