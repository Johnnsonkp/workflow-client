import { IconX } from '@tabler/icons-react';
import React from 'react'
import { rem } from '@mantine/core';

interface Task {
    title: string;
    description: string;
    time_to_start: string;
    status: string;
    time_to_complete?: string;
    order: number;
}

interface DateObj {
    day: number;
    date: number;
    month: number;
    year: number;
    full_date?: number;
    task? : Task[];
}

interface Props {
    obj: DateObj
    todaysDate: number;
    setToggleDelete: React.Dispatch<React.SetStateAction<({task: Task | undefined, toggle: boolean})>>;
    toggleDelete: ({task: Task | undefined, toggle: boolean});
    index: number | string;
}

const ShiftCard: React.FC<Props>  = ({obj, todaysDate, toggleDelete, setToggleDelete, index}) => {
    const handleDeleteTask = (task: Task | undefined) => {
        setToggleDelete({
          task: task,
          toggle: !toggleDelete.toggle
        })
    }

    return (
        obj.task && obj.task.length > 0? obj.task.map((task: any) => (
            <div key={index + task.order + task.title} className={`relative cursor-pointer border ${task ? 'border-gray-300' : 'border-gray-200'} flex-col mt-2 text-[12px] h-32 w-32 rounded-md  p-1 
                ${obj?.date === todaysDate? '!bg-[#D2F8D9] !border-green-500' : "bg-[#F9F9FB] border-gray-200"}`}
            >
                <div className='flex-col align-middle'>
                    <div className='relative'>
                        <p className='border border-gray-100 bg-white rounded-lg w-5 text-center'>{task?.order}</p> 
                        <div
                            onClick={() => handleDeleteTask(task)}
                            className='bg-red-500 text-white absolute right-0 top-0 w-4 text-center rounded-sm'>
                            <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5}/>
                        </div>
                    </div>
                    <p className='text-[9px] my-1'>{task?.time_to_start} - {task?.time_to_complete}</p>
                </div>
                <p className='font-semibold'>{task?.title}</p>
                <p className='text-[10px] mt-3 absolute bottom-1'>{task?.status}</p>
            </div>
        )) : 
    
        <div key={index} className='p-1 border border-gray-300 bg-transparent rounded-md mt-2 w-32 text-center text-[12px] h-32'>Unscheduled</div>
    )
}

export default ShiftCard
