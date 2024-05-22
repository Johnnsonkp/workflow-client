import { DisplayContainer } from '../components/displayContainer/DisplayContainer'
import React from 'react'

function WorkLanding() {
  return (
    <>
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
    </>
  )
}

export default WorkLanding