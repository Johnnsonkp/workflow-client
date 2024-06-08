import { Button, Group, Input, NumberInput, Select, SimpleGrid, TextInput, Textarea, Title } from '@mantine/core';
import { DatePickerInput, DateTimePicker, TimeInput } from '@mantine/dates';
import React, {useEffect, useState} from 'react'
import {getDateTimeValue, monthsArr, reformatDateInput} from '../../utils/dateUtills.js'
import {storeTask, taskFormActions} from '../../actions/taskActions.js'

import CustomForm from './CreateTaskForm'
import classes from './form.module.css'
import {getItemFromLocalStorage} from '../../utils/localstorage.js'
import { useAppState } from '../../store/AppState.jsx'
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function CreateTaskForm() {
  const [hhMinute, setHhMinute] = useState<Date | string | undefined>()
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()
  const userData = getItemFromLocalStorage('AUTH')
  let newDate = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  let yearDateValue = new Date().toLocaleDateString()
  const {state, dispatch} = useAppState()

  let yyyymmddDf = new Date().toLocaleDateString('default', { year: 'numeric', month: '2-digit', day: '2-digit' })
  let rxDateFm = yyyymmddDf.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')

  const [startDateValue, setStartDateValue] = useState<any>(rxDateFm)
  const [startTime, setStartTime] = useState<any>(newDate)
  const [finishTime, setFinishTime] = useState<any>(newDate)

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      status: '',
      time_to_start: '',
      time_to_finish: '',
      start_date: startDateValue,
      order: '',
      // project: '',
    },
    validate: {
      title: (value) => value.trim().length < 2,
    },
  });
  
  const convertTo12hrFormat = (timeValue: string) => {
    console.log(timeValue)
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

  const handleFormSubmit = async (form: any, userData: any) => {

    form.values.start_date = reformatDateInput(startDateValue)
    form.values.time_to_start = convertTo12hrFormat(startTime)
    form.values.time_to_finish = convertTo12hrFormat(finishTime)
    
    const taskActions = await taskFormActions['create']
    
    taskActions(form.values, userData).then((data: any) => {
      console.log("taskActions data state.user_id", data)
      storeTask(data, dispatch, "CREATE_TASK" )
      // dispatch({type: "STATE_REFRESH", payload: true})
    })
    navigate('/personal')
  }

  return (
    <form 
      className='flex-row items-center justify-center bg-white w-[93%] h-[530px] m-auto rounded-md '
      onSubmit={form.onSubmit(() => handleFormSubmit(form, userData))}
    >
      <Title
        order={2}
        size="h2"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={600}
        ta="left"
      >
        Create New Task
      </Title>
      <hr className='mt-2'></hr>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        <TextInput
          label="Task Name"
          placeholder="Task Name"
          name="title"
          variant="filled"
          size='md'
          {...form.getInputProps('title')}
        />
         <NumberInput
            {...form.getInputProps('order')}
            key={form.key('order')}
            label="Order"
            placeholder="Order"
            variant="filled"
            size='md'
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
        {...form.getInputProps('description')}
      />
      <SimpleGrid cols={{ base: 3, sm: 3 }} mt="md">

        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Start Date
          </label>
          <input 
              onChange={(e) => setStartDateValue(e.target.value)}
              id="effective-date" 
              type="date" 
              name="effective-date"
              pattern="\d{4}-\d{2}-\d{2}"
              defaultValue={rxDateFm}
              className='bg-[#F1F3F5] rounded-md text-[12px] px-3 h-8 '
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Start Time</label>
          <TimeInput 
            onChange={(e) => setStartTime(e.target.value)}
            defaultValue={newDate}
            variant="filled" 
            ref={ref} 
          /> 
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Finish Time
          </label>
          <TimeInput 
            onChange={(e) => setFinishTime(e.target.value)}
            defaultValue={newDate}
            variant="filled" 
            ref={ref} 
          />
        </SimpleGrid>
        
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        <Select
            label="Status"
            placeholder="todo"
            name="status"
            variant="filled"
            data={['todo', 'inprogress', 'complete', 'due']}
            size='md'
            defaultValue='todo'

            {...form.getInputProps('status')}
        />
      </SimpleGrid>
      
      <hr className='mt-7'></hr>
      <Group justify="right" mt="xl">
        <Button type="submit" size="sm">
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Save
        </Button>
      </Group>
    </form>
  );
}

export default CreateTaskForm