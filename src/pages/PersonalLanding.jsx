import * as classes from '../components/formButtonToggle/formButton.module.css'

import { Button, Modal } from '@mantine/core'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
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
import { storeTaskObj } from '../actions/taskActions.js'
import { useAppState } from '../store/AppState.jsx'
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";

function PersonalLanding() {
  const [taskPanel, setTaskPanel] = useState('list')
  const [togglePannel, setTogglePanel] = useState('')
  const {state, dispatch} = useAppState()
  const [taskObj, setTaskObj] = useState(state.tasks || [])
  // const [taskObj, setTaskObj] = useState([])
  const [formValue, setFormValue] = useState([])
  const [toggleForm, setToggleForm] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedUpdateForm, { openUpdateForm, closeUpdateForm }] = useDisclosure(false);
  const [openForm, setOpenForm] = useState(close)
  const userData = getItemFromLocalStorage('AUTH')
  const navigate = useNavigate()
  const [updateForm, setUpdateForm] = useState({
    task: null,
    toggle: false
  })
  
  const initialTaskLoad = useCallback(() => {
    if(loading && !taskObj.length && state.tasks){
      console.log("loading", loading)
      setTaskObj(state.tasks);
    }
    return () => {setLoading(false)} 
  }, [loading])

  useEffect( () => {
    (async () => {
      if(state.refreshState){
        const taskActions = await taskFormActions['get']
        const taskRefreshed = await taskActions(userData)

        setTaskObj(taskRefreshed);
        dispatch({type: "STATE_REFRESH", payload: false})
      }
    })();
    return () => {}
  }, [state.refreshState, taskObj])

  useEffect(() => {
    initialTaskLoad()
  }, [])

  const deleteTask =  async (taskToDelete, taskObj) => {
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

  useEffect(() => {
    setTaskPanel(togglePannel || "list")
  }, [togglePannel])

  return (
    <DefaultContainer className='relative !overflow-hidden'>
      <DefaultContainer className={`${toggleForm? "h-[100vh]" : ""} !shadow-md`}>
        <InnerTopNav setTogglePanel={setTogglePanel}/>
        {taskPanel === 'list' && <DashboardBannerCards taskObj={taskObj}/> }
        <DashboardDisplay />
      </DefaultContainer>
      
      <Button onMouseDown={open} onClose={close} 
        className={`shadow-lg ${classes.button} ${opened? classes.buttonOpen : classes.buttonClose}`}
      >
        <IconPlus size={30} className={`!transition-all !duration-500 ${opened && classes.buttonRotate}  `}/>
      </Button>

      <Modal 
        opened={opened} 
        onClose={close} 
        centered 
        fullScreen={false} 
        size="900px"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <CreateTaskForm />
      </Modal>
      <Modal 
        opened={updateForm.toggle} 
        onClose={() => setUpdateForm({task: updateForm?.task , toggle: false})} 
        centered 
        fullScreen={false} 
        size="900px"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}  
      >
        <UpdateTaskForm task={updateForm?.task}/>
      </Modal>
    </ DefaultContainer>
  );
}

export default PersonalLanding;

