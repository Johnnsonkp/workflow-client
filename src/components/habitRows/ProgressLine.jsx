import React from 'react'

const ProgressLine = ({entry, row, index, direction}) => (
    <div className=' flex-[0.35]'>
        {
            direction?
                <hr className={`transition-all duration-900 ease-in-out border ${entry?.complete && row?.entries[index - 1]?.complete? 'bg-[#4FFFB0]  h-[3px] border-green-200 w-[100%]' : '!w-[0%]' }  `}></hr>
                    : 
                <hr className={`transition-all duration-900 ease-in-out border ${entry?.complete && row?.entries[index + 1]?.complete? 'bg-[#4FFFB0] h-[3px] border-green-200 w-[100%]' : '!w-[0%]' }  `}></hr>
        }
    </div>
)

export default ProgressLine

// #4FFFB0


{/* <hr className={`transition-all duration-900 ease-in-out border ${entry?.complete && row?.entries[index - 1]?.complete? 'bg-green-200  h-[3px] border-green-200 w-[100%]' : '!w-[0%]' }  `}></hr> */}