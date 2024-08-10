import * as classes from '../components/formButtonToggle/formButton.module.css'

import { Box, Button, LoadingOverlay, Modal } from '@mantine/core'
import React, { useEffect, useState } from 'react'

import CreateTaskForm from '../components/forms/CreateTaskForm.tsx'
import DashboardBannerCards from '../components/dashboardBanner/DashboardBannerCards.tsx'
import {DefaultContainer} from '../components/boilerplate/DefaultContainer.jsx'
import { IconPlus } from '@tabler/icons-react';
import InnerTopNav from '../components/innerTopNav/InnerTopNav.tsx'
import ListViewDisplay from '../components/listViewDisplay/ListViewDisplay.tsx'
import TimeTableDisplay from '../components/timeTableDisplay/TimeTableDisplay.tsx'
import UpdateTaskForm from '../components/forms/UpdateTaskForm.tsx'
import WeekView from '../components/weekView/WeekView.tsx'
import { getItemFromLocalStorage } from '../utils/localstorage.js'
import { taskFormActions } from '../actions/taskActions.js'
import { useAppState } from '../store/AppState.jsx'
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";

function PersonalLanding() {
  const [taskPanel, setTaskPanel] = useState('list')
  const [togglePannel, setTogglePanel] = useState('')
  const {state, dispatch} = useAppState()
  const [taskObj, setTaskObj] = useState(state.tasks || [])
  const [formValue, setFormValue] = useState([])
  const [toggleForm, setToggleForm] = useState(false)
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedUpdateForm, { openUpdateForm, closeUpdateForm }] = useDisclosure(false);
  const [openForm, setOpenForm] = useState(close)
  const userData = getItemFromLocalStorage('AUTH')
  const navigate = useNavigate()
  const [loadingDisplay, setLoadingDisplay] = useState(true)
  const [updateForm, setUpdateForm] = useState({
    task: null,
    toggle: false
  })  

  const deleteTask =  async (taskToDelete, taskObj) => {
    const deleteTaskAction = await taskFormActions['delete']
    deleteTaskAction(userData, taskToDelete.id)
    setTaskObj((prevState) => prevState.filter((t) => t.id != taskToDelete.id ))
    // dispatch({type: "STATE_REFRESH", payload: true})
  }

  const handleTaskArchive = async (taskToUpdate) => {
    const updateActions = await taskFormActions['update']
    updateActions(taskToUpdate, state?.user, taskToUpdate.id).then((data) => {
      console.log("taskActions update", data)
      setTaskObj((prevState) => prevState.filter((t) => t.id != data.id ).concat(data))
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
    {switch(taskPanel){
        case "list":
          return <ListViewDisplay 
            taskObj={taskObj} 
            deleteTask={deleteTask} 
            setUpdateForm={updateFormData} 
            handleTaskArchive={handleTaskArchive}
          />
          break;
        case "time":
          return <TimeTableDisplay taskObj={taskObj} deleteTask={deleteTask}/>
          break;
        case "week":
          return <WeekView taskObj={taskObj} deleteTask={deleteTask}/>
          break; 
    }}
  }

  useEffect(() => {
    setTaskPanel(togglePannel || "list")
  }, [togglePannel])

  return (
    <DefaultContainer className={`relative  !mx-[auto]`}>
      <DefaultContainer className={`${toggleForm? "h-[100vh]" : ""} max-w-[1600px] m-[auto] }`}>
        <InnerTopNav setTogglePanel={setTogglePanel} title={'Dashboard'}/>
        {taskPanel === 'list' && <DashboardBannerCards /> }
        <DashboardDisplay />
      </DefaultContainer>
      <Button 
        onMouseDown={open} 
        onClose={close} 
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

