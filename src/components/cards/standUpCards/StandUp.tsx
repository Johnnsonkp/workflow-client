import { Button, Card, Group, Modal, Switch, Text } from '@mantine/core';
import React, {useEffect, useState} from 'react'

import classes from './standUp.module.css'
import { useDisclosure } from '@mantine/hooks';

const StandUpCardCustom = () => {
  const [toggle, setToggle] = useState(false)
  const [toggleText, setToggleText] = useState(false)
  const [toggleForm, setToggleForm] = useState(false)
  const [opened, { open, close }] = useDisclosure(toggleForm);

  const [standUpObj, setStandUpObj] = useState([ 
    {title: 'Workflow client build', complete: false }, 
    {title:'Shopify dev study',complete: false }, 
    {title: "Catch up on all bills and payments", complete: false }
  ])

  const [standUP_1, setStandUp_1] = useState(standUpObj[0].title)
  const [standUP_2, setStandUp_2] = useState(standUpObj[1].title)
  const [standUP_3, setStandUp_3] = useState(standUpObj[2].title)

  const completeStandup = (index) => {
    let newArr = [...standUpObj]
    newArr[index].complete = !newArr[index].complete
    setStandUpObj(newArr)
  }

  const handleFormSubmit = () => {
    setToggleForm(close)
    setStandUpObj([ 
      {title: standUP_1, complete: false},
      {title: standUP_2, complete: false},
      {title: standUP_3, complete: false}
    ])
  }

  const Items = () => (
    standUpObj.map((standUp, index) => (
      <Group justify="space-between" className={`${classes.item} cursor-pointer`} wrap="nowrap" gap="md" key={index}>
        <Text onMouseDown={open} onClose={close} size="sm" className={`${standUp.complete? '!line-through' : ''}`}>{index + 1}. {standUp.title}</Text>
        <Switch 
          onLabel="UNCHECK" offLabel="CHECK" className={`${classes.switch} !z-50`} size="xs" 
          onChange={() => completeStandup(index)}
         />
      </Group>
    )) 
  );

  return (
    <>
      <Card withBorder radius="md" p="md" className={`${classes.card}`} pb="" >
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
          Add Daily Stand Up
          <div className={`${classes.inner} flex-col`}>
            <form>
              <Group justify="space-around" className={classes.item} wrap="nowrap" gap="xs">
                <label>1.</label>
                <input 
                  defaultValue={standUpObj[0].title}
                  className='w-[100%]' 
                  onChange={(e) => setStandUp_1(e.target.value)}></input>
              </Group>  
              <Group justify="space-around" className={classes.item} wrap="nowrap" gap="xs">
                <label>2.</label>
                <input 
                  defaultValue={standUpObj[1].title}
                  className='w-[100%]' onChange={(e) => setStandUp_2(e.target.value)}></input>
              </Group>  
              <Group justify="space-around" className={classes.item} wrap="nowrap" gap="xs">
                <label>3.</label>
                <input 
                  defaultValue={standUpObj[2].title}
                  className='w-[100%]' onChange={(e) => setStandUp_3(e.target.value)}></input>
              </Group> 
            </form>
          </div>
          <div className='mt-4 w-[100%]'>
            <hr className='mb-5'></hr>
            <Button onClose={close} className='!w-[100%]' 
              onClick={() => {handleFormSubmit()}}
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
