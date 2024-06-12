import { Button, Pagination, Skeleton, Table, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconArrowsSort, IconSort09, IconSortAscending } from '@tabler/icons-react';
import React, {MouseEvent, useEffect, useState} from 'react'

import { EmptyTaskModal } from '../EmptytTaskModals/EmptyTaskModal';
import ListViewSingle from './ListViewSingle';
// import TaskListSkeleton from './TaskListLoadSkeleton';
import TaskListLoadSkeleton from './TaskListLoadSkeleton';
import classes from './list.module.css'
import {useAppState} from '../../store/AppState.jsx'
import { useDisclosure } from '@mantine/hooks';

const taskStatus: Record<string, string> = {
  todo: "blue",
  inprogress: "orange",
  complete: "green",
  due: "red"
};

interface Task {
    id?: number;
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

const ListViewDisplay: React.FC<Prop> = ({ taskObj, checked, defaultChecked, onChange, deleteTask, setUpdateForm}) => {
  const {state, dispatch} = useAppState()
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true)
  const [listTasks, setListTasks] = useState(taskObj)

  const toggleFormModule = (task: Task, toggle: boolean) => {
    setUpdateForm(task, toggle)
  }
  
  const handleDeleteTask = (task: Task) => {
    const newTaskObj = listTasks && listTasks.filter((t) => t.id != task.id )
    setListTasks(newTaskObj)
    deleteTask(task, listTasks)
  }
  const [loadingComponent, setLoadingComponent]: any = useState(true)

  useEffect(() => {
    if(state.latestTask !== null && listTasks.length > 0 && taskObj.length > 0){
      let newArr = []
      listTasks.forEach((item) => item.id !== state.latestTask.id?  newArr.push(item) : '')
      newArr.push(state.latestTask)
      // return setListTasks((prevState: Task[] | any) => listTasks.filter((item) => item.id !== state.latestTask.id).push(state.latestTask) || state.latestTask)
      return setListTasks(newArr)
    }else{
      return
    }
  }, [state.latestTask])

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
      .map((_, index) => ({ 
        id: index, 
        task: Array.isArray(listTasks)? 
          listTasks.sort(function(a, b){return a.order-b.order}) : listTasks
      })),
    7
  );
  const [activePage, setPage] = useState(1);
  const paginationCount =  Math.ceil(listTasks?.length / 7) 
  const items = data[activePage - 1].map((item) => (
    item.task[item.id] &&
      <ListViewSingle 
        key={item.id} 
        task={item.task[item.id]} 
        taskStatus={taskStatus} 
        handleDeleteTask={handleDeleteTask}
        toggleFormModule={toggleFormModule}
        opened={opened}
        open={open}
        close={close}
      /> 
  ));

  const taskListRefresh = () => {
    setListTasks(taskObj)
    setLoading(!loading)
    setLoadingComponent(!loadingComponent)
  }

  useEffect(() => {
    if(loading){
      let loadingDelay = setTimeout(() => {
        if(items){
          setLoadingComponent(false)
          setLoading(false)
        }
      }, 200)
      return () => clearTimeout(loadingDelay);
    }
  }, [loading])
  
  return (
    <div className={`${classes.listTable} w-[99%] m-[auto] h-[] cursor-pointer border border-#D1D1D1 bg-white rounded-md mt-10 mb-5`}>
      <Table.ScrollContainer minWidth={800}>
        <Table 
          verticalSpacing="xs" 
          striped={true}
          withColumnBorders={false}
          className={`${listTasks && listTasks.length > 2? 'min-h-[250px]' : listTasks && listTasks.length <= 1 && 'min-h-[150px]' }`}
        >
          <Table.Thead className="">
            <Table.Tr className="text-[12px]" fw={600}>
              <Table.Th className="">Complete</Table.Th>
              <Table.Th className="">Order</Table.Th>
              <Table.Th className="">Name</Table.Th>
              {/* <Table.Th className="flex"><IconArrowsSort size={18} className='mx-1'/>Status</Table.Th> */}
              <Table.Th className="">Status</Table.Th>
              <Table.Th className="">Task Date</Table.Th>
              <Table.Th className="">Start Time - Finsh Time</Table.Th>
              <Table.Th className="">Project</Table.Th>
              <Table.Th className=""><Button size='xs' onClick={() => taskListRefresh()}>Refresh</Button></Table.Th>
            </Table.Tr>
          </Table.Thead>{
              <Table.Tbody className="bg-[#fff] !border-b-2 transition-all delay-100">{ 
                loadingComponent? <TaskListLoadSkeleton /> : listTasks && listTasks.length > 0? items : <EmptyTaskModal />}
              </Table.Tbody>}
        </Table>
        <div className='px-3'>
          {!loadingComponent &&
            <Pagination 
              total={paginationCount} 
              value={activePage} 
              onChange={setPage} 
              mt="xl" size="xs" 
              color="#228a"
            />
          }
        </div>
      </Table.ScrollContainer>
    </div>
  );
}

export default ListViewDisplay;
