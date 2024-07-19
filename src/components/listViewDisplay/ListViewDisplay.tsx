import React, {useEffect, useState} from 'react'

import CustomiseListData from './CustomiseListData';
import ListViewSingle from './ListViewSingle';
import TableUI from './TableUI';
import { Task } from '../../types/GlobalTypes';

const taskStatus: Record<string, string> = {
  todo: "blue",
  inprogress: "orange",
  complete: "green",
  due: "red"
};

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
  
  const [activePage, setPage] = useState(1);
  const items = CustomiseListData(listTasks, showArchive)[activePage - 1].map((item) => (
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

  return (
    <TableUI 
      items={items} 
      listTasks={listTasks} 
      setArchieve={setArchieve} 
      showArchive={showArchive} 
      activePage={activePage} 
      setPage={setPage}
    />
  );
}

export default ListViewDisplay;
