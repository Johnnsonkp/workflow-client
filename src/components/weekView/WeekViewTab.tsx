import React from 'react'

function WeekViewTab({obj, todaysDate}) {
  return (
    <div className={`flex p-1 rounded-md`}>
        <div className={`inline-flex ${ obj.date === todaysDate? 'bg-blue-400 text-white font-bold px-2 rounded-lg' : ''} text-[12px]`}>
            <p className={`px `}>{obj.day.slice(0, 3)}</p>
            <p className='px-1'>{obj.date}</p>
            <p className='px'>{obj.month}</p>
        </div>
    </div>
  )
}

export default WeekViewTab