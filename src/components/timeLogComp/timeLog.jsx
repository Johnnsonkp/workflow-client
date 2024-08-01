import React from 'react'

function TimeLogs() {
  
  const thingsHaveDone = [
    {id: 1, time: '12:00 AM', text: "created dummy UI component",},
    {id: 2, time: '01:00 PM', text: "Second text for component"},
    {id: 3, time: '02:00 PM', text: "Begin working on blogging component"},
    {id: 4, time: '04:00 PM', text: "Bible study / plus pledge"},
  ]
    
  return (
    <div className='shadow-md border border-blue-500 p-3 rounded-md w-[300px]'>
        <p className='text-sm mb-1'>Things I've done:</p>
        {thingsHaveDone.map((things, index) => (
            <div key={index} className='p-1 text-sm flex-row border border-red-400'>
                <p className='text-xs'>{things.time}</p>
                <p className='text-xs'>{things.text}</p>
            </div>
        ))}

        <button className=''> + </button>
    </div>
  )
}

export default TimeLogs
