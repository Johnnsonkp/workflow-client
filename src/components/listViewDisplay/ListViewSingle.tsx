import { ActionIcon, Badge, Button, Group, Modal, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { IconArchive, IconCalendar, IconPencil, IconTrash } from '@tabler/icons-react';
import { IconCircleCheck, IconCircleDashed, IconCircleFilled, IconTimeDuration0 } from '@tabler/icons-react';

import ListActionsComp from './ListActionsComp';
import React from 'react'
import { Task } from '../../types/GlobalTypes';
import TaskListLoadSkeleton from './TaskListLoadSkeleton';
import classes from './list.module.css'
import { taskFormActions } from '../../actions/taskActions';
import { useAppState } from '../../store/AppState';

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
  const {state} = useAppState()
  
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

      <Table.Td 
        className='w-10'
        onClick={() => toggleFormModule( {task: taskObj, toggle: true})}
      > 
        <Badge color={'black'} variant="light" className='!flex '>
          <ThemeIcon bg="transparent" variant='light' w={'100%'} className='!flex !justify-between !align-middle'>
            <ThemeIcon color={taskStatus[taskObj.status]} size={15} radius="xl" variant="light">
              <IconCircleFilled color="transparent" style={{ width: rem(13), height: rem(8) }} /> 
            </ThemeIcon>
            <Text fw={600} 
              className={`!text-[9px] !px-1 !text-[#333]`}>
                {taskObj.status}
              </Text>
          </ThemeIcon>
        </Badge>
      </Table.Td>

      <Table.Td className='opacity-[0.7] w-10'
        onClick={() => toggleFormModule( {task: taskObj, toggle: true})}
      >
        <Badge color={'black'} variant="light">
          <ThemeIcon bg="transparent" variant='light' w={'100%'} 
          className='!flex !justify-between !align-middle'>
            <IconCalendar size={15} style={{ marginRight: rem(2) }}/>
            <Text fw={600} className='!text-[10px] !text-[#111]'>{taskObj?.start_date}</Text>
          </ThemeIcon>
        </Badge>
      </Table.Td>


      <Table.Td className='opacity-[0.7] w-5'
        onClick={() => toggleFormModule( {task: taskObj, toggle: true})}
      >
        <Badge color={'black'} variant="light">
        <ThemeIcon bg="transparent" variant='light' w={'100%'} 
          className='!flex !justify-between !align-middle'>
            <IconTimeDuration0 size={15} style={{ marginRight: rem(2) }}/>
            <Text fw={600} className='!text-[10px] !text-[#111]'>{taskObj?.time_to_start} - {taskObj?.time_to_finish || taskObj.time_to_start}</Text>
          </ThemeIcon>
        </Badge>
      </Table.Td>

      <Table.Td className='w-13 text-center'>
        <Text fz="xs">General Task</Text>
      </Table.Td>
      
      <ListActionsComp 
        taskObj={taskObj}
        task={task}
        toggleTaskArchive={toggleTaskArchive}
        handleDeleteTask={handleDeleteTask}
      />
    </Table.Tr>
  </>
}

export default ListViewSingle