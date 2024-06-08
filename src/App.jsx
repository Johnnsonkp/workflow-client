import './App.css'

import { useEffect, useState } from 'react'

import { DisplayContainer } from './components/displayContainer/DisplayContainer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState()

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex-[0.73] bg-white rounded-md border border-black-500'>
          <DisplayContainer
            title={"OPEN FOR EVERY SHIFT"}
          />
        </div> 
        <div className='flex-[0.25] bg-white rounded-md border border-black-500'>
          <div>
            <h1>Reminder:</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default App