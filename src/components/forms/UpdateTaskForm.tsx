// import '../calendarInputDate/DateTimePicker.css'

import { ActionIcon, Button, Group, Input, NumberInput, Select, SimpleGrid, TextInput, Textarea, Title } from '@mantine/core';
import { DatePickerInput, DateTimePicker, TimeInput } from '@mantine/dates';
import React, {useEffect, useRef, useState} from 'react'
import {getDateTimeValue, monthsArr, reformatDateInput} from '../../utils/dateUtills.js'
import {storeTask, taskFormActions} from '../../actions/taskActions.js'

import CustomForm from './CreateTaskForm'
import { IconClock } from '@tabler/icons-react';
import classes from './form.module.css'
import {getItemFromLocalStorage} from '../../utils/localstorage.js'
import { useAppState } from '../../store/AppState.jsx'
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

function UpdateTaskForm({task}) {
  const taskToUpdate = task?.task || null
  const navigate = useNavigate()
  
  const taskValuePresence = (item: any) => {
    return taskToUpdate && taskToUpdate[item]? taskToUpdate[item] : '' 
  }

  const form = useForm({
    initialValues: {
      title: taskValuePresence('title'),
      description: taskValuePresence('description'),
      status: taskValuePresence('status'),
      time_to_start: taskValuePresence('time_to_start'),
      time_to_finish: taskValuePresence('time_to_finish'),
      start_date: taskValuePresence('start_date'),
      order: taskValuePresence('order'),
    },
    validate: {
      title: (value) => value.trim().length < 2,
    },
  });
  
  let start_date_rx = form.values.start_date
  let yyyymmddDf = new Date(start_date_rx).toLocaleDateString('default', { year: 'numeric', month: '2-digit', day: '2-digit' })
  let rxDateFm = yyyymmddDf.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')
  const [value, setValue] = useState<any>(rxDateFm)
  const [startTime, setStartTime] = useState<any>(null)
  const [finishTime, setFinishTime] = useState<any>(null)
  const [hhMinute, setHhMinute] = useState<Date | string | undefined>(null)
  const userData = getItemFromLocalStorage('AUTH')
  let newDate = new Date();
  let newDateString = getDateTimeValue(newDate)
  const ref = useRef<HTMLInputElement>(null);
  const {state, dispatch} = useAppState()

  let rxNewDate = taskValuePresence('time_to_start').replace('AM', '').replace('PM', '').trim()
  let timeToFinish = taskValuePresence('time_to_finish').replace('AM', '').replace('PM', '').trim()
  
  const convertTo12hrFormat = (timeValue: string) => {
    let firstValue = timeValue.charAt(0)
    let secondValue = timeValue.charAt(1)
    let firstSecondValue = firstValue + secondValue
    let timeValueToNumber = Number(firstSecondValue)

    if(timeValueToNumber > 12){
      let timeDiff = timeValueToNumber - 12
      let timeFormated = timeDiff < 10 ? ('0' + timeDiff) : timeDiff

      let newTime = timeFormated.toString() + timeValue.charAt(2) + timeValue.charAt(3) + timeValue.charAt(4) + ' PM'
      return newTime
    }
    return timeValue + " AM"
  }


  const handleFormSubmit = (form: any, userData: any) => {
    form.values.start_date = reformatDateInput(value)
    form.values.time_to_start = convertTo12hrFormat(startTime || rxNewDate)
    form.values.time_to_finish = convertTo12hrFormat(finishTime || timeToFinish)
    
    const taskActions = taskFormActions['update']

    taskActions(form.values, userData, taskValuePresence('id')).then((data: any) => {
      console.log("taskActions data state.user_id", data)
      let addToTasks = state.tasks.filter((task) => task.id  !== data.id)
      let updatedTaskAdded = addToTasks.concat(data)
      dispatch({type: "ALL_TASK", payload: updatedTaskAdded})
    })
  }

  return (
    <form 
      className='flex-row items-center justify-center bg-white w-[93%] h-[530px] m-auto rounded-md '
      onSubmit={form.onSubmit(() => handleFormSubmit(form, userData))}
    >
      <Title
        order={2}
        size="h3"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={700}
        ta="left"
      >
        Update Task: {taskValuePresence('title')}
      </Title>
      <hr className='mt-2'></hr>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        <TextInput
          label="Task Name"
          placeholder={`${task.task?.title}`}
          name="title"
          variant="filled"
          size='md'
          {...form.getInputProps('title')}
        />
        <NumberInput
          {...form.getInputProps('order')}
          key={form.key('order')}
          label="Order"
          placeholder={taskValuePresence('order')}
          defaultValue={taskValuePresence('order')}
          value={taskValuePresence('order')}
          variant="filled"
          size='md'
          min={0}
        />
      </SimpleGrid>
      <Textarea
        mt="md"
        label="Description"
        placeholder="Task Description"
        maxRows={10}
        minRows={3}
        autosize
        size='md'
        name="description"
        variant="filled"
        defaultValue={taskValuePresence('description')}
        {...form.getInputProps('description')}
      />
      <SimpleGrid cols={{ base: 3, sm: 3 }} mt="md">
        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Start Date</label>
          <input 
              onChange={(e) => setValue(e.target.value)}
              id="effective-date" 
              type="date" 
              name="effective-date"
              pattern="\d{4}-\d{2}-\d{2}"
              defaultValue={rxDateFm}
              value={value || rxDateFm}
              className='bg-[#F1F3F5] rounded-md text-[12px] px-3 h-8 '
          />
          
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Start Time
        </label>
          <TimeInput 
            onChange={(e) => setStartTime(e.target.value)}
            variant="filled" 
            ref={ref} 
            defaultValue={rxNewDate}
          />

        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Finish Time</label>
          <TimeInput 
            onChange={(e) => setFinishTime(e.target.value)}
            variant="filled" 
            ref={ref} 
            defaultValue={timeToFinish}
          />
        </SimpleGrid>
        
      </SimpleGrid>
      <SimpleGrid cols={{ base: 6, sm: 2, md: 2 }} mt="lg" w={'80%'}>
        <Select
            label="Status"
            placeholder={taskValuePresence('status')}
            name="status"
            variant="filled"
            data={['todo', 'inprogress', 'complete', 'due']}
            size='sm'
            // value={value}
            defaultValue={taskValuePresence('status')}
            {...form.getInputProps('status')}
        />
        <Select
          label="User ID"
          variant="filled"
          size='sm'
          disabled
          placeholder={`${state.user.user_id || 'User not found'}`}
          defaultValue={`${state.user.user_id || 'User not found'}`}
        />
      </SimpleGrid>
      
      <hr className='mt-7'></hr>
      <Group justify="left" mt="xl">
        <Button type="submit" size="md">
          Cancel
        </Button>
        <Button type="submit" size="md">
          Save
        </Button>
      </Group>
    </form>
  );
}

export default UpdateTaskForm