import { ActionIcon, Badge, Group, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed, IconCircleFilled } from '@tabler/icons-react';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import React from 'react'
import classes from './list.module.css'

const ListViewSingle = ({task, taskStatus, handleDeleteTask, toggleFormModule}) => (
    <Table.Tr 
      onClick={() => toggleFormModule( {task: task, toggle: true})}
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

      <Table.Td>
        <Group gap="xl">
          <Text fz="xs" fw={600} className=''>
            {task.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td className='w-20'>
        <Badge color={taskStatus[task.status]} variant="light">
          <Text fw={600} className='!text-[9px]'>{task.status}</Text>
        </Badge>
        {/* <Text fw={400} className='!text-[12px]'>{task.status}</Text> */}
      </Table.Td>

      <Table.Td className='w-20'>
        <Badge color={'blue'} variant="light">
          <Text fw={600} className='!text-[10px]'>{task.time_to_start} - {task.time_to_start}</Text>
        </Badge>
      </Table.Td>

      <Table.Td className=''>
        <Text fz="xs">General Task</Text>
      </Table.Td>

      <Table.Td>
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