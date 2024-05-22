import { Card, Text, rem } from '@mantine/core';
import { IconClearAll, IconCross, IconX } from '@tabler/icons-react';
import React, {useState} from 'react'

interface Task {
    title: string | undefined;
    description?: string | undefined;
    time_to_start?: string | undefined;
    status?: string | undefined;
    time_to_complete?: string | undefined;
    order?: string | undefined;
    project?: string | undefined
    start_date?: string
}

interface ContainerColor {
    [key: string]: string;
}

interface Prop {
  task: Task | undefined;
  setToggleDelete: React.Dispatch<React.SetStateAction<({task: Task | undefined, toggle: boolean})>>;
  toggleDelete: ({task: Task | undefined, toggle: boolean})
}

  const SmallTaskCard: React.FC<Prop> = ({task, setToggleDelete, toggleDelete }) => {

    const containerColor: ContainerColor = {
      todo: "!bg-blue-400",
      inprogress: "!bg-orange-400",
      complete: "!bg-green-500",
      overdue: "!bg-red-500"
    }

    const handleDeleteTask = (task: Task | undefined) => {
      setToggleDelete({
        task: task,
        toggle: !toggleDelete.toggle
      })
    }

    return (
      <Card withBorder radius="sm" padding="xs" className={`${containerColor[task?.status ?? 'default']} text-white w-[260px] h-[47px] absolute !pt-1 relative`}>
        <div className='flex align-top text-left text-[1rem]'>
          <p className='text-[0.6rem] text-#343434 bg-white border border-white rounded-lg px-[6px]'>
            {task?.order }
          </p>
          <p className='text-right text-[0.7rem] mx-1 text-white'>
            {task?.start_date }
          </p>
          <p className='text-right text-[0.7rem] mx-1 text-white'>
            {task?.status }
          </p>
          <p className='text-right text-[0.7rem] mx-0 text-white'>
            [{task?.project?.slice(0, 8) }]
          </p>
        </div>
        <Text fz="xs" fw={700} className='!text-white text-[1rem] mb-5'>
          {task?.title?.slice(0, 30)}...
        </Text>
        <div
          onClick={() => handleDeleteTask(task)}
          className='bg-red-500 text-white absolute top-1 right-1 w-4 text-center rounded-sm'>
          <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5}/>
        </div>
      </Card>
    )
}

export default SmallTaskCard