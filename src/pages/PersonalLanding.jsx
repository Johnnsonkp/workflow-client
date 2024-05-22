import * as classes from '../components/formButtonToggle/formButton.module.css'

import { Button, Modal } from '@mantine/core'
import React, {useEffect, useState} from 'react'
import { storeTask, taskFormActions } from '../actions/taskActions.js'

import CreateTaskForm from '../components/forms/CreateTaskForm.tsx'
import DashboardBannerCards from '../components/dashboardBanner/DashboardBannerCards.tsx'
import {DefaultContainer} from '../components/boilerplate/DefaultContainer.jsx'
import FormButton from '../components/formButtonToggle/FormButton.tsx'
import { IconPlus } from '@tabler/icons-react';
import InnerTopNav from '../components/innerTopNav/InnerTopNav.tsx'
import ListViewDisplay from '../components/listViewDisplay/ListViewDisplay.tsx'
import { LoadingContainer } from '../components/boilerplate/LoadingContainer.jsx'
import TimeTableDisplay from '../components/timeTableDisplay/TimeTableDisplay.tsx'
import UpdateTaskForm from '../components/forms/UpdateTaskForm.tsx'
import WeekView from '../components/weekView/WeekView.tsx'
import { getItemFromLocalStorage } from '../utils/localstorage.js'
import { getTask } from '../services/taskService.js'
import { useAppState } from '../store/AppState.jsx'
import { useDisclosure } from '@mantine/hooks';

function PersonalLanding() {
  const [taskPanel, setTaskPanel] = useState('list')
  const [togglePannel, setTogglePanel] = useState('')
  const [taskObj, setTaskObj] = useState([])
  const [toggleForm, setToggleForm] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {state, dispatch} = useAppState()
  const [opened, { open, close }] = useDisclosure(false);
  const [openForm, setOpenForm] = useState(close)
  const userData = getItemFromLocalStorage('AUTH')
  const [updateForm, setUpdateForm] = useState({
    task: null,
    toggle: false
  })

  const loadTasks = async () => {
    const taskActions = await taskFormActions['get']
    taskActions(userData).then((data) => {
      console.log("taskActions data state.user_id", data)
      setTaskObj(data);
    })
  }

  useEffect(() => {
    if(loading && !taskObj.length){
      loadTasks()
      setLoading(false);
    }
  }, [loading])
  

  const deleteTask =  async (taskToDelete, taskObj) => {
    const newTaskObj = taskObj && taskObj.filter((t) => t.id != taskToDelete.id )
    setTaskObj(newTaskObj)

    const deleteTaskAction = await taskFormActions['delete']
      deleteTaskAction(userData, taskToDelete.id).then((data) => {
        console.log("taskActions data state.user_id", taskToDelete)
      })
  }

  const updateFormData = (task) => {
    console.log("form data update", task)
    setUpdateForm({
      task: task,
      toggle: task.toggle
    })
  }

  const DashboardDisplay = () => {
    {
      switch(taskPanel){
        case "list":
          return <ListViewDisplay taskObj={taskObj} deleteTask={deleteTask} setUpdateForm={updateFormData}/>
          break;
        case "time":
          return <TimeTableDisplay taskObj={taskObj} deleteTask={deleteTask}/>
          break;
        case "week":
          return <WeekView taskObj={taskObj} deleteTask={deleteTask}/>
          break; 
      }
    }
  }

  const FormModules = () => {
    return <>
    <Modal opened={opened} onClose={close} centered fullScreen={false} size="900px">
        <CreateTaskForm />
      </Modal>

      <Modal opened={updateForm.toggle} onClose={() => setUpdateForm({task: null, toggle: false})} centered fullScreen={false} size="900px">
        <UpdateTaskForm task={updateForm?.task}/>
      </Modal>
    </>
  }

  useEffect(() => {
    console.log("updateForm", updateForm)
  }, [setUpdateForm])

  useEffect(() => {
    setTaskPanel(togglePannel || "list")
  }, [togglePannel])

  return (
    <LoadingContainer className='relative !overflow-hidden' loading={taskObj}>
      <DefaultContainer className={`${toggleForm? "h-[100vh]" : ""} !shadow-md`}>
        <InnerTopNav setTogglePanel={setTogglePanel}/>
        {taskPanel === 'list' && <DashboardBannerCards taskObj={taskObj}/> }
        {loading? "loading..." : <DashboardDisplay />}
      </DefaultContainer>

      <Button onClick={open} onClose={close} 
        className={`shadow-lg ${classes.button} ${opened? classes.buttonOpen : classes.buttonClose}`}
      >
        <IconPlus size={30} className={`!transition-all !duration-500 ${opened && classes.buttonRotate}  `}/>
      </Button>

      <FormModules />
    </LoadingContainer>
  );
}

export default PersonalLanding;

