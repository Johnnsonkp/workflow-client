import React, {useEffect, useState} from 'react'

import { IconClock } from '@tabler/icons-react'
import { Menu } from '@mantine/core'

function CountDownTimer() {
    const [toggle, setToggle] = useState(false)

    const TimerDropDown: () => Date = () => {
        let newDate: Date = new Date();
        return newDate
    }
 
  return (
    <div onClick={() => setToggle(!toggle)}>
        <IconClock color={"#999"}/>
        <Menu.Dropdown className='flex-col'>
            <div className={toggle? 'visible' : 'hidden'}>{TimerDropDown().toString() }</div>
        </Menu.Dropdown>    
    </div>
  )
}

export default CountDownTimer