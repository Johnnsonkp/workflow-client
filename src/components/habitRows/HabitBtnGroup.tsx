import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

function HabitBtnGroup({open, close, showDate, setShowDate}) {
  return (
    <div className='flex justify-end m-2 mt-4'>
        <Button className='m-2' size='xs' onClick={() => setShowDate(!showDate)}>Show habit date</Button>
        <Button size='xs' onClick={open} className={`shadow-lg m-2`}>
            <IconPlus size={20} className={`!transition-all !duration-500 `}/> Add Habit
        </Button>
    </div>
  )
}

export default HabitBtnGroup