import { Pagination, Skeleton, Table, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import React, {MouseEvent, useEffect, useState} from 'react'

import ListViewSingle from './ListViewSingle';
import classes from './list.module.css'
import {useAppState} from '../../store/AppState.jsx'

const taskStatus: Record<string, string> = {
  todo: "blue",
  inprogress: "orange",
  complete: "green",
  due: "red"
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
  const {state, dispatch} = useAppState()
  const [completedTaskOrd, setCompletedTaskOrd]: any = useState()
  const [sortTaskByOrder, setSortTaskByOrder] = useState(null)
  const [allTaskInOrder, setAllTaskInOrder]: any  = useState(null)

  let allCompletedTask = taskObj?.filter((task: any) => task.status === 'complete')
  let unCompletedTask = taskObj?.filter((task) => task.status !== 'complete')
  let inCompletedTaskInOrder = unCompletedTask?.sort(function(a, b){return a.order-b.order});


  let combineAllTasks = []
  if(inCompletedTaskInOrder){
    combineAllTasks.push(allCompletedTask?.concat(inCompletedTaskInOrder))
  }

  const toggleFormModule = (task: Task, toggle: boolean) => {
    setUpdateForm(task, toggle)
  }

  const handleDeleteTask = (task: Task) => {
    deleteTask(task, taskObj)
  }


  const [loadingComponent, setLoadingComponent]: any = useState(true)

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
      .map((_, index) => ({ id: index, task: taskObj.sort(function(a, b){return a.order-b.order}) || null})),
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

  const TaskListLoadSkeleton = () => {
    return <Table.Tbody className='absolute m-[auto] py-3 px-3'>
      <Skeleton height={40} radius="sm" width={'80vw'}/>
      <Skeleton height={40} mt={8} radius="sm" />
      <Skeleton height={40} mt={8} radius="sm" />
      <Skeleton height={40} mt={8} radius="sm" />
    </Table.Tbody>
  }


  useEffect(() => {
    let loadingDelay = setTimeout(() => {
      if(items){
        setLoadingComponent(false)
      }
   }, 500)

   return () => clearTimeout(loadingDelay);
  }, [taskObj])
  

  return (
    <div className={`${classes.listTable} w-[99%] m-[auto] h-[99%] cursor-pointer border border-#D1D1D1 bg-white rounded-md`}>
      <Table.ScrollContainer minWidth={800}>
        <Table 
          verticalSpacing="xs" 
          striped={true}
          withColumnBorders={false}
          className={`${loadingComponent? 'min-h-[250px]' : '' }`}
        >
          <Table.Thead className="">
            <Table.Tr className="text-[12px]" fw={600}>
              <Table.Th className="">Complete</Table.Th>
              <Table.Th className="">Order</Table.Th>
              <Table.Th className="">Name</Table.Th>
              <Table.Th className="">Status</Table.Th>
              <Table.Th className="">Task Date</Table.Th>
              <Table.Th className="">Start Time - Finsh Time</Table.Th>
              <Table.Th className="">Project</Table.Th>
            </Table.Tr>
          </Table.Thead>
            {loadingComponent? <TaskListLoadSkeleton /> : <Table.Tbody className="bg-[#fff] !border-b-2 transition-all delay-800 ">{items }</Table.Tbody>}
          </Table>
            <div className='px-3'>
              <Pagination total={paginationCount} value={activePage} onChange={setPage} mt="xl" size="xs" color="#228be65e"/>
            </div>
      </Table.ScrollContainer>
    </div>
  );
}

export default ListViewDisplay;
