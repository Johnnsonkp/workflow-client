import '../calendarInputDate/DateTimePicker.css'

import { Button, Group, Input, NumberInput, Select, SimpleGrid, TextInput, Textarea, Title } from '@mantine/core';
import { DatePickerInput, DateTimePicker } from '@mantine/dates';
import React, {useEffect, useState} from 'react'
import {getDateTimeValue, monthsArr, reformatDateInput} from '../../utils/dateUtills.js'
import {storeTask, taskFormActions} from '../../actions/taskActions.js'

import CustomForm from './CreateTaskForm'
import DateTimePickerCus from '../calendarInputDate/DateTimePickerCus';
import classes from './form.module.css'
import {getItemFromLocalStorage} from '../../utils/localstorage.js'
import { useAppState } from '../../store/AppState.jsx'
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function CreateTaskForm() {
  const [value, setValue] = useState<any>(null)
  const [hhMinute, setHhMinute] = useState<Date | string | undefined>(null)
  const navigate = useNavigate()
  const userData = getItemFromLocalStorage('AUTH')
  let newDate = new Date();
  let newDateString = getDateTimeValue(newDate)
  const {state, dispatch} = useAppState()

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      status: '',
      time_to_start: '04:00 PM',
      time_to_finish: '05:00 PM',
      start_date: value,
      order: '',
      // project: '',
    },
    validate: {
      title: (value) => value.trim().length < 2,
      // start_date: reformatDateInput(value)
    },
  });

  const handleFormSubmit = (form: any, userData: any) => {
    form.values.start_date = reformatDateInput(value)
    const taskActions = taskFormActions['create']

    taskActions(form.values, userData).then((data: any) => {
      console.log("taskActions data state.user_id", data)
      storeTask(data, dispatch, "CREATE_TASK", )
      navigate('/personal')
    })
  }

  return (
    // <CustomForm 
    //   form={form} 
    //   handleFormSubmit={handleFormSubmit} 
    //   userData={userData}
    //   newDateString={newDateString}
    //   value={value}
    // />
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
        New Task
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
            >Start Date</label>
          <input 
              onChange={(e) => setValue(e.target.value)}
              id="effective-date" 
              type="date" 
              name="effective-date"
              pattern="\d{4}-\d{2}-\d{2}"
              defaultValue={newDateString}
              value={value || undefined}
              className='bg-[#F1F3F5] rounded-md text-[12px] px-3 h-8 '
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Start Time</label>
          <input 
              onChange={(e) => setValue(e.target.value)}
              id="effective-date" 
              type="date" 
              name="effective-date"
              pattern="\d{4}-\d{2}-\d{2}"
              defaultValue={newDateString}
              value={value || undefined}
              className='bg-[#F1F3F5] rounded-md text-[12px] px-3 h-8 '
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing={1} mt="">
          
          <label 
            className={`m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label mt-1 ${classes.customInputLabel}`}
            >Finish Time</label>
          <input 
              onChange={(e) => setValue(e.target.value)}
              id="effective-date" 
              type="date" 
              name="effective-date"
              pattern="\d{4}-\d{2}-\d{2}"
              defaultValue={newDateString}
              value={value || undefined}
              className='bg-[#F1F3F5] rounded-md text-[12px] px-3 h-8 '
          />
        </SimpleGrid>
        
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
        {/* <NumberInput
            {...form.getInputProps('order')}
            key={form.key('order')}
            label="Order"
            placeholder="Order"
        /> */}
        <Select
            label="Status"
            placeholder="Task status"
            name="status"
            variant="filled"
            data={['todo', 'inprogress', 'complete', 'due']}
            size='md'
            value={value}
            // defaultValue={data[0]}
            {...form.getInputProps('status')}
        />
        {/* <TextInput
            label="Project"
            placeholder="Project"
            name="project"
            variant="filled"
            size='xs'
            {...form.getInputProps('project')}
        /> */}
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

export default CreateTaskForm