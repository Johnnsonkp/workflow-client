import { Badge, Button, Card, Group, Modal, Switch, Text, ThemeIcon } from '@mantine/core';
import {IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled, IconPlus} from '@tabler/icons-react';
import React, {useEffect, useState} from 'react'

import SingleDate from '../../weekView/SingleDate';
import classes from './standUp.module.css'
import { standupFormActions } from '../../../actions/standupActions';
import { useAppState } from '../../../store/AppState';
import { useDisclosure } from '@mantine/hooks';

const StandUpCardCustom = () => {
  const [toggleForm, setToggleForm] = useState<boolean | any>(false);
  const [opened, { open, close }] = useDisclosure(toggleForm);
  const {state, dispatch} = useAppState()
  const [updateStandup, setUpdateStandup] = useState(false)
  const [refreshStandUP, setRefreshStandUP] = useState(false)
  const [formTitle, setFormTitle] = useState('')

  var today = new Date();
  const todaysDate = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear()
  let ddmmyyyy = todaysDate + "/" + month + "/" + year
  const getStandUp = standupFormActions['get']

  const dummyStanUpObj = ({
    date: ddmmyyyy,
    standup_tasks: [
      { title: 'Workflow client build', complete: false },
      { title: 'Set up postgreSQL table on railway', complete: false },
      { title: 'Catch up on monthly tasks', complete: false }
    ]
  });

  const [standUpObj, setStandUpObj] = useState({
    id: state?.standup?.id || ddmmyyyy,
    date: state?.standup.date || dummyStanUpObj.date,
    standup_tasks: state.standup.standup_tasks && state.standup.standup_tasks?.sort((a,b) => b.complete - a.complete) || dummyStanUpObj.standup_tasks
  });


  const [standUP_1, setStandUp_1] = useState(standUpObj?.standup_tasks[0]?.title)
  const [standUP_2, setStandUp_2] = useState(standUpObj?.standup_tasks[1]?.title)
  const [standUP_3, setStandUp_3] = useState(standUpObj?.standup_tasks[2]?.title)


  async function updateFormAction(standUp){
    const formActions = await standupFormActions['update']
    console.log("updated standUp", standUp)
    formActions(standUp, state.user).then((data) => {
      setRefreshStandUP(true)
    })
  }

  const completeStandup = async (standUp, index) => {
    standUp.complete = !standUp.complete
    updateFormAction(standUp)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // console.log("formTitle:", formTitle.toLowerCase())
    console.log("state on submission", state)
    setToggleForm(close)
    const newTaskObj = {
      id: standUpObj.id, 
      date: ddmmyyyy,
      standup_tasks: [
        {id: standUpObj.standup_tasks[0].id, title: standUP_1, complete: standUpObj?.standup_tasks[0].complete},
        {id: standUpObj.standup_tasks[1].id, title: standUP_2, complete: standUpObj?.standup_tasks[1].complete},
        {id: standUpObj.standup_tasks[2].id, title: standUP_3, complete: standUpObj?.standup_tasks[2].complete}
      ]
    }
    setStandUpObj(newTaskObj)
    setUpdateStandup(!updateStandup)
  }


  useEffect(() => {
    async function postStandUp(){
      const formActions = await standupFormActions[formTitle.toLowerCase()]

      if(standUpObj){
        console.log("standUpObj", standUpObj)
        formActions(standUpObj, state.user).then((data) => {
          console.log("data posted", data)
          dispatch({type: "LATEST_STAND_UP", payload: {
            date: data.date,
            standup_tasks: data.standup_tasks
          }})
        })
      }
    }

    if(updateStandup && standUpObj){
      console.log("fetching stand up")
      postStandUp()
      setUpdateStandup(!updateStandup)
    }
  }, [updateStandup, standUpObj])  

  useEffect(() => {
    if(refreshStandUP === true){
      setRefreshStandUP(false)
    }
  }, [refreshStandUP, standUpObj])

  const Items = () => (
    standUpObj.standup_tasks.map((standUp, index) => (
      <ThemeIcon p={'xs'} bg="#F2F3F5" variant='light' w={'100%'}  
        className={`${classes.item} !flex !justify-between !align-middle !border !border-gray-200 `}>
          <Text size="xs" className={`!text-[10px] !text-[#111] ${standUp.complete? '!line-through' : ''}`}>{index + 1}. {standUp.title}</Text>

          <Switch 
              className={`${classes.switch} !z-50`} size="xs" 
            onClick={() => completeStandup(standUp, index)}
            checked={standUp.complete}
            translate={'yes'}  
          />
      </ThemeIcon>
    )) 
  );

  return (
    <>
      <Card withBorder radius="md" p="md" className={`${classes.card}`} pb="" >
        <div className='flex justify-between'>
          <div className='flex mb-2'>
            <Button fz="8px" p={'1px'} h={'24px'} bg={'#95A2D9'} size="compact-xs" className='mx-1 !text-[#fff] !border-gray-200'>
              <IconArrowBadgeLeftFilled size={'15px'} />
            </Button>
            <div className='border border-gray-100 rounded-sm py-1 px-1 bg-white text-[10px]'>
              {standUpObj?.date || <SingleDate fz={'10px'}/>}
            </div>
            <Button fz="8px" p={'1px'} h={'24px'} bg={'#95A2D9'} size="compact-xs" className='mx-1 !text-[#fff] !border-gray-200'>
              <IconArrowBadgeRightFilled size={'15px'} />
            </Button>
          </div>
          <div onClick={(e: any) => setFormTitle(e.target.innerText)}>
            <Button 
              className='shadow-sm !border-gray-200 !text-[#fff]' bg={'#95A2D9'} h={'24px'} fz={'10px'} p={'6px'} 
              onClick={open}
            >
              <IconPlus size={'13px'}/>
              Create
            </Button>
          </div>
        </div>
        <div className={classes.inner}>
          <Items />
        </div>
      </Card>

      <Modal 
        opened={opened} 
        onClose={close} 
        centered 
        fullScreen={false} 
        // size="900px"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}  
      > 
        <Card withBorder radius="md" p="md" className={`${classes.card}`} pb="">
          {formTitle || "Add Daily Stand Up"}
          <div className={`${classes.inner} flex-col`}>
            <form>
              <Group justify="space-around" className={classes.item} wrap="nowrap" gap="xs">
                <label>1.</label>
                <input 
                  defaultValue={standUpObj && standUpObj.standup_tasks[0].title}
                  className='w-[100%]' 
                  onChange={(e) => setStandUp_1(e.target.value)}></input>
              </Group>  
              <Group justify="space-around" className={classes.item} wrap="nowrap" gap="xs">
                <label>2.</label>
                <input 
                  defaultValue={standUpObj && standUpObj.standup_tasks[1].title}
                  className='w-[100%]' onChange={(e) => setStandUp_2(e.target.value)}></input>
              </Group>  
              <Group justify="space-around" className={classes.item} wrap="nowrap" gap="xs">
                <label>3.</label>
                <input 
                  defaultValue={standUpObj && standUpObj.standup_tasks[2].title}
                  className='w-[100%]' onChange={(e) => setStandUp_3(e.target.value)}></input>
              </Group> 
            </form>
          </div>
          <div className='mt-4 w-[100%]'>
            <hr className='mb-5'></hr>
            <Button className='!w-[100%]' 
              onClick={(e) => handleFormSubmit(e)}
            >
            Save
            </Button>
          </div>
        </Card>

      </Modal>

      </>
  );
}

export default StandUpCardCustom
