import { IconX } from '@tabler/icons-react';
import React from 'react'
import { rem } from '@mantine/core';

interface Task {
    title: string;
    description: string;
    time_to_start: string;
    status: string;
    time_to_finish?: string;
    order: number;
}

interface DateObj {
    day: string;
    date: number;
    month: string;
    year: number;
    full_date?: string | undefined;
    task?: Task[] | undefined;
 }

interface Props {
    obj: DateObj
    todaysDate: number;
    setToggleDelete: React.Dispatch<React.SetStateAction<({task: Task | undefined, toggle: boolean})>>;
    toggleDelete: ({task: Task | undefined, toggle: boolean});
    index: number | string;
    uniqueID: number
}

const ShiftCard: React.FC<Props>  = ({obj, todaysDate, toggleDelete, setToggleDelete, index, uniqueID}) => {
    const handleDeleteTask = (task: Task | undefined) => {
        setToggleDelete({
          task: task,
          toggle: !toggleDelete.toggle
        })
    }

    return (
        obj?.task && Array.isArray(obj.task) && obj.task.length > 0 ? obj.task.map((task, index) => (    
            <div key={index + task.title} 
                className={`relative cursor-pointer border ${task ? 'border-gray-300' : 'border-gray-200'} flex-col mt-2 text-[12px] h-[120px] w-28 rounded-md  p-1 
                    ${obj?.date === todaysDate? 'bg-[#DBEAFE] border-[#60A5FA]' : "bg-[#F9F9FB] border-gray-200"}
                    ${task.status == 'complete' && '!bg-[#D2F8D9] !border-green-500' }`
                }
            >
                <div className='flex-col align-middle'>
                    <div className='relative'>
                        <p className='border bg-white rounded-lg w-5 text-center text-[9px]'>
                            {task?.order}
                        </p> 
                        <div
                            onClick={() => handleDeleteTask(task)}
                            className='bg-red-500 text-white absolute right-0 top-0 w-4 text-center rounded-sm'>
                            <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5}/>
                        </div>
                    </div>
                    <p className='text-[8px] my-1'>{task?.time_to_start} - {task?.time_to_finish}</p>
                </div>
                <p className='font-semibold text-[10px]'>{task?.title}</p>
                <p className='text-[10px] mt-3 absolute bottom-1'>{task?.status}</p>
            </div>
        )) : 
    
        <div key={uniqueID} 
            className='p-1 border border-gray-300 bg-transparent rounded-md mt-2 w-28 text-center text-[10px] h-[120px] flex align-middle justify-center'>
                Unscheduled
        </div>
    )
}

export default ShiftCard
