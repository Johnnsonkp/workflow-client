import { IconCalendar } from '@tabler/icons-react'
import React from 'react'
import { useAppState } from '../../store/AppState'

interface DateTask {
    date: string,
    month: string,
}

function TopTabs({dateDisplayObjWithTask}) {
  const {state, dispatch} = useAppState()
  let dateTask: DateTask[] = dateDisplayObjWithTask || null
    
  return (
    <div className='p-2 text-[11px] flex align-middle'>
        <div className='mr-1 inline-flex align-middle border border-blue-100 bg-blue-100 text-blue-500 font-bold rounded-sm mb-4'>
            <IconCalendar size={'14px'} className='m-[auto] ml-2'/>
            <p className='px-2'> {dateTask && dateTask[0].date} {dateTask && dateTask[0].month}</p> -
            <p className='px-2'>{dateTask && dateTask[dateTask.length - 1].date} {dateTask && dateTask[dateTask.length - 1].month}</p>
        </div>

        <div className='ml-1 inline-flex border border-blue-200 bg-blue-100 text-blue-500 font-bold rounded-sm mb-4'>
        <p className='px-3 inline-flex align-middle justify-around'> {state?.tasks && state?.tasks?.length} Up coming tasks</p>
        </div>
        
        <div className='ml-1 inline-flex border border-blue-200 bg-blue-100 text-blue-500 font-bold rounded-sm mb-4'> 
        <p className='px-3 inline-flex'>Weekly Total: 32 hours</p>
        </div>
    </div>
  )
}

export default TopTabs