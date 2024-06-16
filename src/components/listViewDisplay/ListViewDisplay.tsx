import { Button, Pagination, Skeleton, Table, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import React, {MouseEvent, useCallback, useEffect, useState} from 'react'

import { ActionIcon } from '@mantine/core';
import { CustomSwitch } from '../customSwitch/CustomSwitch';
import { EmptyTaskModal } from '../EmptytTaskModals/EmptyTaskModal';
import { IconArchive } from '@tabler/icons-react';
import ListViewSingle from './ListViewSingle';
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
    number?: string
}

interface Prop {
    taskObj: Task[] | undefined
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    task: Task;
    deleteTask: (task: Task, deleteTask: Task[] | undefined) => void;
    handleTaskArchive: (task: Task) => void;
    setUpdateForm: (task: Task, toggle: boolean) => void;
}


const ListViewDisplay: React.FC<Prop> = ({ taskObj, checked, defaultChecked, onChange, deleteTask, setUpdateForm, handleTaskArchive}) => {
  const {state, dispatch} = useAppState()
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true)
  const [listTasks, setListTasks] = useState(taskObj)
  const [showArchive, setArchieve] = useState(null)

  const toggleFormModule = (task: Task, toggle: boolean) => {
    setUpdateForm(task, toggle)
  }
  
  const handleDeleteTask = (task: Task) => {
    const newTaskObj = listTasks && listTasks.filter((t) => t.id != task.id )
    setListTasks((prevState) => prevState.filter((t) => t.id != task.id ))
    deleteTask(task, newTaskObj)
  }
  
  const handleUpdateTask = (task: Task) => {
    setListTasks((prevState) => prevState.filter((t) => t.id != task.id ).concat(task))
    handleTaskArchive(task)
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

  const listItems = (listTasks, showArchive) => {
    let sortedList = Array.isArray(listTasks)? listTasks.sort(function(a, b){return a.order-b.order}) : listTasks
    let showHideArchive = showArchive? sortedList.filter((task) => task.number == null).concat(sortedList) 
    : sortedList.filter((task) => task.number == showArchive)
    
    return showHideArchive
  }

  const data = chunk(
    Array(30)
      .fill(0)
      .map((_, index) => ({ 
        id: index, 
        task: listItems(listTasks, showArchive)
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
        handleUpdateTask={handleUpdateTask}
      /> 
  ));


  useEffect(() => {
      let loadingDelay = setTimeout(() => {
        if(items){
          console.log("listViewTask")
          setLoadingComponent(false)
          setLoading(false)
        }
      }, 200)
      return () => {
        clearTimeout(loadingDelay)
      }
  }, [])
  
  return (
    <div className={`${classes.listTable} w-[99%] m-[auto] h-[] cursor-pointer border border-#D1D1D1 bg-white rounded-md mt-10 mb-5`}>
      <Table.ScrollContainer minWidth={800}>
        <Table 
          verticalSpacing="xs" 
          striped={true}
          withColumnBorders={false}
          className={`${listTasks && listTasks.filter((task) => task.number == null).length > 2? 'min-h-[250px]' : 
          listTasks && listTasks.filter((task) => task.number == null).length == 1 && 'min-h-[130px]'} 
            ${listTasks.filter((task) => task.number == null).length < 1 && 'h-[240px]'}`}
        >
          <Table.Thead className="">
            <Table.Tr p={'xs'} className="text-[12px]" fw={600}>
              <Table.Th className="">Complete</Table.Th>
              <Table.Th className="">Name</Table.Th>
              <Table.Th className="">Status</Table.Th>
              <Table.Th className="">Task Date</Table.Th>
              <Table.Th className="">Start Time - Finsh Time</Table.Th>
              <Table.Th className="">Project</Table.Th>
              <Table.Th className="">
                <button 
                  className='!m-[0px] border border-#1C7ED6-500 rounded-[4px] py-[0.4rem] px-3 text-[#fff] font-medium text-[11px] bg-[#1C7ED6]' 
                  onClick={() => setArchieve((prevState) => prevState === null? "archive" : null)}>
                    {showArchive? 'Hide' : 'Show'} Archive
                </button>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody className="!border-b-2">
            { loadingComponent? <TaskListLoadSkeleton /> : listTasks && listTasks.length > 0? items : <EmptyTaskModal />}
          </Table.Tbody>
        </Table>
        <div className='px-3'>
          {!loadingComponent &&
            <Pagination 
              total={paginationCount} 
              value={activePage} 
              onChange={setPage} 
              mt="md" 
              size="xs" 
              color="#228a"
            />
          }
        </div>
      </Table.ScrollContainer>
    </div>
  );
}

export default ListViewDisplay;
