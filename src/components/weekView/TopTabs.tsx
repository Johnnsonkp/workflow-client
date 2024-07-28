import { IconCalendar } from '@tabler/icons-react'
import React from 'react'
import { useAppState } from '../../store/AppState'

interface DateTask {
    date: string,
    month: string,
}


function TopTabs({dateDisplayObjWithTask, DateDisplay}) {
  const {state} = useAppState()
  let dateTask: DateTask[] = dateDisplayObjWithTask || null
  
  const upcomingWeeklyTasks = () => {
    let upcomingTaskCounter = []
    if(!state?.tasks){
      return upcomingTaskCounter
    }

    state?.tasks.forEach((task) => {
      let t = task?.start_date
      let d = DateDisplay

      t.slice(0,2) >= d[0].date && t.slice(0,2) < d[d.length - 1].date && t.includes(d[0].month) && upcomingTaskCounter.push(task)
    })

    return upcomingTaskCounter
  }

    
  return (
    <div className='p-2 text-[11px] flex align-middle'>
        <div className='mr-1 inline-flex align-middle  bg-gray-100 text-black-500 font-semibold rounded-sm mb-4'>
            <IconCalendar size={'14px'} className='m-[auto] ml-2'/>
            <p className='px-2'> {dateTask && dateTask[0].date} {dateTask && dateTask[0].month}</p> -
            <p className='px-2'>{dateTask && dateTask[dateTask.length - 1].date} {dateTask && dateTask[dateTask.length - 1].month}</p>
        </div>

        <div className='ml-1 inline-flex bg-gray-100 text-black-500 font-semibold rounded-sm mb-4'>
          <p className='px-3 inline-flex align-middle justify-around'> {upcomingWeeklyTasks().length} Up coming tasks</p>
        </div>
        
        {/* <div className='ml-1 inline-flex bg-gray-100 text-black-500 font-semibold rounded-sm mb-4'> 
          <p className='px-3 inline-flex'>Weekly Total: 32 hours</p>
        </div> */}
    </div>
  )
}

export default TopTabs