import React, {useEffect} from 'react'

import { standupFormActions } from '../actions/standupActions'
import { useAppState } from '../store/AppState'
import { useState } from 'react'

function StandupPage() {
    const {state} = useAppState()
    const getStandUp = standupFormActions['getAll']
    const [standUpObj, setStandUpObj] = useState()

    useEffect(() => {
        getStandUp(state.user).then((data) => {
          console.log("data:", data)
          setStandUpObj(data)
        })
    }, []) 
    
  return (
    <div>

        <div>
            <li>Date</li>
            <li>Stand up 1</li>
            <li>Stand up 2</li>
            <li>Stand up 3</li>
        </div>
    </div>
  )
}

export default StandupPage