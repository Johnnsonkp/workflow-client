import React from 'react'

function EmptyWeekCard({index}) {
  return (
    <div 
        key={index} 
        className='p-1 border border-gray-300 bg-transparent rounded-md mt-2 w-28 text-center text-[10px] h-28 flex align-middle justify-center'
    >
        Unscheduled
    </div>
  )
}

export default EmptyWeekCard