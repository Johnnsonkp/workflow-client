import { ActionIcon, Badge, Button, Group, Modal, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { IconArchive, IconCalendar, IconPencil, IconTrash } from '@tabler/icons-react';
import { IconCircleCheck, IconCircleDashed, IconCircleFilled, IconTimeDuration0 } from '@tabler/icons-react';

import React from 'react'
import classes from './list.module.css'
import { taskFormActions } from '../../actions/taskActions';
import { useAppState } from '../../store/AppState';
import { useDisclosure } from '@mantine/hooks';

// ody: JSON.stringify({
//   title: formData.title,
//   description: formData.description,
//   status: formData.status,
//   order: formData.order,
//   start_date: formData.start_date,
//   time_to_start: formData.time_to_start,
//   time_to_finish: formData.time_to_finish,
//   user_id: userData.user_id
// })

interface Task {
  id?: number;
  title: string;
  description: string;
  time_to_start: string;
  status: string;
  time_to_finish: string;
  start_date: string;
  order: number;
  project?: string;
  number? : number;
}
const emptyTask: Task = {
  title: '',
  status: '',
  description: '',
  order: 10,
  start_date: '',
  time_to_start: '',
  time_to_finish: '',
}



const ListViewSingle = ({task, taskStatus, handleDeleteTask, toggleFormModule, handleUpdateTask}) => {
  const taskObj: Task = task || emptyTask
  const toggleTaskArchive = (task) => {
    task.number = !task.number && "archive" || task.number && null
    const updatedTask = task

    handleUpdateTask(updatedTask)
  }

  return <>
    <Table.Tr 
      key={task?.id} 
      className={`hover:!bg-[#f4f4f4] border border-gray-50 ${taskObj.title == "" && 'h-[50px]'}
        rounded-lg ${taskObj?.status === 'complete'? classes.taskList : classes.defaultTaskList }`}
    >
      {taskObj.title !== "" &&  
      <>
      <Table.Td className='w-1 m-auto'>
        <Group gap="[0px]">
          {taskObj.status === 'complete'? 
            <ThemeIcon color="teal" size={30} radius="xl">
              <IconCircleCheck style={{ width: rem(36), height: rem(40) }} /> 
            </ThemeIcon> :
            <ThemeIcon color="rgba(228, 230, 240)" size={30} radius="xl">
              <IconCircleFilled color="" style={{ width: rem(36), height: rem(40) }} /> 
            </ThemeIcon>
          }
        </Group>
      </Table.Td>

      <Table.Td className='w-[35%]'onClick={() => toggleFormModule( {task: task, toggle: true})}>
        <Group gap="" className='min-w-64'>
          <Text fz="xs">{taskObj.order}</Text>
          <Text fz="xs" fw={500} className=''>
          {taskObj.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td className='w-10'
        onClick={() => toggleFormModule( {task: taskObj, toggle: true})}
      > 
        <Badge color={'black'} variant="light" className='!flex '>
          <div className='!flex !justify-between !align-middle'>
            <ThemeIcon color={taskStatus[taskObj.status]} size={15} radius="xl" variant="light">
              <IconCircleFilled color="transparent" style={{ width: rem(13), height: rem(8) }} /> 
            </ThemeIcon>
            <Text fw={600} className='!text-[9px] !px-1 '>{taskObj.status}</Text>
          </div>
        </Badge>
      </Table.Td>

      <Table.Td className='opacity-[0.7] w-10'
        onClick={() => toggleFormModule( {task: taskObj, toggle: true})}
      >
        <Badge color={'black'} variant="light">
          <div className='!flex !justify-between !align-middle'>
            <IconCalendar size={15} style={{ marginRight: rem(2) }}/>
            <Text fw={600} className='!text-[10px]'>{taskObj?.start_date}</Text>
          </div>
        </Badge>
      </Table.Td>


      <Table.Td className='opacity-[0.7] w-5'
        onClick={() => toggleFormModule( {task: taskObj, toggle: true})}
      >
        <Badge color={'black'} variant="light">
          <div className='!flex !justify-between !align-middle'>
            <IconTimeDuration0 size={15} style={{ marginRight: rem(2) }}/>
            <Text fw={600} className='!text-[10px]'>{taskObj?.time_to_start} - {taskObj?.time_to_finish || taskObj.time_to_start}</Text>
          </div>
        </Badge>
      </Table.Td>

      <Table.Td className='w-13 text-center'>
        <Text fz="xs">General Task</Text>
      </Table.Td>
      
      <Table.Td className='w-13'>
        <Group gap={0} justify="flex-end">
          <ActionIcon onClick={() => toggleTaskArchive(task)} variant="subtle" 
            color={`${task.number? 'blue' : 'gray'}`}>
            <IconArchive style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          {/* <ActionIcon variant="subtle" color="red" onClick={open} > */}
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteTask(taskObj)} >
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
      </>
    }
    </Table.Tr>
  </>
}

export default ListViewSingle