import { ActionIcon, Badge, Group, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { IconCalendar, IconPencil, IconTrash } from '@tabler/icons-react';
import { IconCircleCheck, IconCircleDashed, IconCircleFilled, IconTimeDuration0 } from '@tabler/icons-react';

import React from 'react'
import classes from './list.module.css'

const ListViewSingle = ({task, taskStatus, handleDeleteTask, toggleFormModule}) => (
    <Table.Tr 
      // onClick={() => toggleFormModule( {task: task, toggle: true})}
      key={task?.title} 
      className={`hover:!bg-[#f4f4f4] border border-gray-50 
        rounded-lg ${task?.status === 'complete'? classes.taskList : classes.defaultTaskList }`}
    >

      <Table.Td className='w-1 m-auto'>
        <Group gap="xs">
          {task.status === 'complete'? 
            <ThemeIcon color="teal" size={30} radius="xl">
              <IconCircleCheck style={{ width: rem(36), height: rem(40) }} /> 
            </ThemeIcon> :
            <ThemeIcon color="rgba(228, 230, 240)" size={30} radius="xl">
              <IconCircleFilled color="" style={{ width: rem(36), height: rem(40) }} /> 
            </ThemeIcon>
          }
        </Group>
      </Table.Td>

      <Table.Td className='w-1'>
        <Text fz="xs">{task.order}</Text>
      </Table.Td>

      <Table.Td className='w-30 '
        onClick={() => toggleFormModule( {task: task, toggle: true})}
      >
        <Group gap="" className='min-w-64'>
          <Text fz="xs" fw={500} className=''>
          {task.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td className='w-10'
        onClick={() => toggleFormModule( {task: task, toggle: true})}
      > 
        {/* <Badge color={taskStatus[task.status]} variant="light" className='!flex'> */}
        <Badge color={'black'} variant="light" className='!flex'>
          <div className='!flex !justify-between !align-middle'>
            <ThemeIcon color={taskStatus[task.status]} size={15} radius="xl" variant="light">
              <IconCircleFilled color="transparent" style={{ width: rem(13), height: rem(8) }} /> 
            </ThemeIcon>
            <Text fw={600} className='!text-[9px] !px-1 '>{task.status}</Text>
          </div>
        </Badge>
      </Table.Td>

      <Table.Td className='opacity-[0.7] w-10'
        onClick={() => toggleFormModule( {task: task, toggle: true})}
      >
        <Badge color={'black'} variant="light">
          <div className='!flex !justify-between !align-middle'>
            <IconCalendar size={15} style={{ marginRight: rem(2) }}/>
            <Text fw={600} className='!text-[10px]'>{task?.start_date}</Text>
          </div>
        </Badge>
      </Table.Td>


      <Table.Td className='opacity-[0.7] w-5'
        onClick={() => toggleFormModule( {task: task, toggle: true})}
      >
        <Badge color={'black'} variant="light">
          <div className='!flex !justify-between !align-middle'>
            <IconTimeDuration0 size={15} style={{ marginRight: rem(2) }}/>
            <Text fw={600} className='!text-[10px]'>{task?.time_to_start} - {task?.time_to_finish || task.time_to_start}</Text>
          </div>
        </Badge>
      </Table.Td>

      <Table.Td className='w-13 text-center'>
        <Text fz="xs">General Task</Text>
      </Table.Td>

      <Table.Td className='w-13'>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red"
            onClick={() => handleDeleteTask(task)}
          >
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
)

export default ListViewSingle