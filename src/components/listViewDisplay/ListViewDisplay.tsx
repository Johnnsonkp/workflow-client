import { ActionIcon, Anchor, Avatar, Badge, Checkbox, Group, Pagination, Table, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, {MouseEvent, useEffect, useState} from 'react'

import ListViewSingle from './ListViewSingle';
import {useAppState} from '../../store/AppState.jsx'
import { useUncontrolled } from '@mantine/hooks';

const taskStatus: Record<string, string> = {
  todo: "blue",
  inprogress: "orange",
  complete: "green",
  overdue: "red"
};

interface Task {
    title: string;
    description: string;
    time_to_start: string;
    status: string;
    time_to_complete: string;
    order: number;
    project?: string;
}

interface Prop {
    taskObj: Task[] | undefined
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    task: Task;
    deleteTask: (task: Task, deleteTask: Task[] | undefined) => void;
    setUpdateForm: (task: Task, toggle: boolean) => void;
}

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: any;
  title: string;
  description: string;
  image: string;
}

const ListViewDisplay: React.FC<Prop> = ({taskObj, checked, defaultChecked, onChange, deleteTask, setUpdateForm}) => {
  // const [value, handleChange] = useUncontrolled({
  //   value: checked,
  //   defaultValue: defaultChecked,
  //   finalValue: false,
  //   onChange,
  // });

  const {state, dispatch} = useAppState()
  const [completedTaskOrd, setCompletedTaskOrd] = useState(null)
  const toggleFormModule = (task: Task, toggle: boolean) => {
    console.log("form toggled", task)
    setUpdateForm(task, toggle)
  }

  const handleDeleteTask = (task: Task) => {
    deleteTask(task, taskObj)
  }

  const [completeTask, setCompleteTask] = useState({
    task: {},
    toggle: false
  })
  const [toggleTaskComplete, setToggleTaskComplete] = useState({
    task: {},
    toggle: false
  })

  useEffect(() => {
    if(toggleTaskComplete.toggle){
      setCompleteTask({
        task: toggleTaskComplete.task?.title,
        toggle: toggleTaskComplete.task?.toggle 
      })
    }
  }, [toggleTaskComplete])


  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const data = chunk(
    Array(30)
      .fill(0)
      .map((_, index) => ({ id: index, task: taskObj || "hello" })),
    7
  );
  const [activePage, setPage] = useState(1);
  const paginationCount =  Math.ceil(taskObj?.length / 7) 
  const items = data[activePage - 1].map((item) => (
    item.task[item.id] &&
      <ListViewSingle 
        key={item.id} 
        task={item.task[item.id]} 
        taskStatus={taskStatus} 
        handleDeleteTask={handleDeleteTask}
        toggleFormModule={toggleFormModule}
      /> 
  ));
  

  return (
    <Table.ScrollContainer minWidth={800} 
      className='cursor-pointer border border-#D1D1D1 bg-white !shadow-xl rounded-md !border-b-orange-500 border-b-4'>
      <Table 
        verticalSpacing="xs" 
        striped={true}
        withColumnBorders={false}
      >
        <Table.Thead className="!bg-[#FAFBFC]">
          <Table.Tr className="!font-normal text-[12px]" fw={100}>
            <Table.Th className="!font-normal">Complete</Table.Th>
            <Table.Th className="!font-normal">Order</Table.Th>
            <Table.Th className="!font-normal">Name</Table.Th>
            <Table.Th className="!font-normal">Status</Table.Th>
            <Table.Th className="!font-normal">Start - Finish Time</Table.Th>
            <Table.Th className="!font-normal">Project</Table.Th>
            {/* <Table.Th className="!font-normal">Actions</Table.Th> */}
          <Table.Th />
          </Table.Tr>
        </Table.Thead>
          <Table.Tbody className="bg-[#fff] !border-b-2 !border-b-black'">{items}</Table.Tbody>
        </Table>
          <div className='px-3'>
            <Pagination total={paginationCount} value={activePage} onChange={setPage} mt="xl" size="sm"/>
          </div>
    </Table.ScrollContainer>
  );
}

export default ListViewDisplay;
