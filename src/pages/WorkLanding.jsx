import { useEffect, useState } from 'react'

import { DisplayContainer } from '../components/displayContainer/DisplayContainer'
import { useAppState } from '../store/AppState'

function WorkLanding() {
  const {state, dispatch} = useAppState()
 const [checkState, setCheckState] = useState(false)

  useEffect(() => {
    console.log("useEffect state before hand", state)

    // dispatch({type: "DARK_THEME", payload: true})
    if(checkState){
      console.log("useEffect state", state)
      dispatch({type: "DARK_THEME", payload: true})
      return setCheckState(false)
    }

    console.log("useEffect state after hand", state)

  }, [checkState])

  
  return (
    <>
    <div className='flex-[0.73] bg-white rounded-md border border-black-500'>
          <DisplayContainer
            title={"OPEN FOR EVERY SHIFT"}
          />
        </div> 
        <div className='flex-[0.25] bg-white rounded-md border border-black-500'>
          <div>
            <h1>Reminder:sss</h1>
          </div>

          <button onClick={() => setCheckState(true)}> update state</button>
    </div>
    </>
  )
}

export default WorkLanding