import React, {useEffect, useState} from 'react'

import { IconSubtask } from '@tabler/icons-react';
import ShiftCard from '../cards/ShiftCard.js';
import WeekViewTab from './WeekViewTab.js';
import {calculateWeek} from '../../utils/dateUtills.js';
import { useAppState } from '../../store/AppState.jsx';

interface Task {
    title: string;
    description: string;
    time_to_start: string;
    status: string;
    time_to_complete: string;
    order: number;
    start_date: string;
    project?: string;
}
interface DateObj {
    day: string;
    date: number;
    month: string;
    year: number;
    full_date?: string | undefined;
    task?: Task[] | undefined;
 }

 interface Props {
    dateObj: DateObj;
    taskObj: Task[] | undefined;
    todaysDate: number;
    deleteTask: (task: Task, deleteTask: Task[] | undefined) => void;
 }

const AddTaskToDateDisplay = (DateDisplay: DateObj[], taskObj: Task[]) => {
    DateDisplay.forEach((dateObj) => {
      dateObj['task'] = []
      for(let i=0; i < taskObj.length; i++){
        if(taskObj[i].start_date){

          if(taskObj[i].start_date.charAt(0) === '0'){
            if (dateObj.full_date === taskObj[i].start_date.slice(1, taskObj[i].start_date.length)){
              dateObj['task'].push(taskObj[i])
            }
          }else if (dateObj.full_date === taskObj[i].start_date) {
            dateObj['task'].push(taskObj[i])
          }
          
        }
      }
    })
  return DateDisplay
}

const GetDays = (formattedToday: string, days: string[], months: string[]) => {
    const dateObj: DateObj[] = []
    const today = new Date();
    var newDate = new Date(formattedToday);
    var dates = new Array();
    dates = calculateWeek(newDate);
    const todaysDate = today.getDate();
    
    for(let i=0; i < dates.length; i++){
      dateObj.push({
        "day": days[dates[i].getDay()],
        "date": dates[i].getDate(),
        "month": months[dates[i].getMonth()],
        "year": dates[i].getFullYear(),
        "full_date": dates[i].getDate() + '/' + months[dates[i].getMonth()] + '/' + dates[i].getFullYear()
     })
    }
    return dateObj 
}

const WeekView: React.FC<Props> = ({taskObj, dateObj, deleteTask}) => {
    const {state, dispatch} = useAppState()
    const stateTasks = state.tasks

    var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1; // Months start at 0!
    var dd = today.getDate();
    const todaysDate = today.getDate();
    if (dd < 10) dd = 0 + dd;
    if (mm < 10) mm = 0 + mm;
    var formattedToday = mm + '/' + dd + '/' + yyyy;
    const DateDisplay = GetDays(formattedToday, days, months)
    // const dateDisplayObjWithTask = AddTaskToDateDisplay(DateDisplay, taskObj)
    const dateDisplayObjWithTask = AddTaskToDateDisplay(DateDisplay, stateTasks)

    let taskCounter = 0
    const [toggleDelete, setToggleDelete] = useState({
      task: undefined,
      toggle: false
    })

    useEffect(() => {
      if(toggleDelete.toggle){
        // toggleDelete.task && deleteTask(toggleDelete.task, taskObj)
        toggleDelete.task && deleteTask(toggleDelete.task, stateTasks)

        setToggleDelete({
          task: undefined,
          toggle: false
        })
      }
    }, [toggleDelete])

    return (
      <>
        <div className='p-2 text-[13px] flex align-middle'>
          <div className='mr-1 inline-flex border border-blue-200 bg-blue-100 text-blue-500 font-bold rounded-sm mb-4'>
            <p className='px-2'>{dateDisplayObjWithTask[0].date} {dateDisplayObjWithTask[0].month}</p> -
            <p className='px-2'>{dateDisplayObjWithTask[dateDisplayObjWithTask.length - 1].date} {dateDisplayObjWithTask[dateDisplayObjWithTask.length - 1].month}</p>
          </div>

          <div className='ml-1 inline-flex border border-blue-200 bg-blue-100 text-blue-500 font-bold rounded-sm mb-4'>
            {/* <p className='px-3 inline-flex align-middle justify-around'> <TaskCountForWeek /> Up coming tasks</p> */}
          </div>
          
          <div className='ml-1 inline-flex border border-blue-200 bg-blue-100 text-blue-500 font-bold rounded-sm mb-4'> 
            <p className='px-3 inline-flex'>Weekly Total: 32 hours</p>
          </div>
          
        </div>
        <div className='flex'>
          {dateDisplayObjWithTask.map((obj, index) => (
            <>
            <div className={`flex-col m-1 text-[13px] `} key={index}>
              {/* <WeekViewTab obj={obj} todaysDate={todaysDate} key={index + obj.day + todaysDate}/> */}
              <WeekViewTab obj={obj} todaysDate={todaysDate} />
              {/* <ShiftCard obj={obj} todaysDate={todaysDate} toggleDelete={toggleDelete} 
                setToggleDelete={setToggleDelete} index={index + obj.day} key={index + obj.day + todaysDate + index}
              /> */}
              <ShiftCard obj={obj} todaysDate={todaysDate} toggleDelete={toggleDelete} 
                setToggleDelete={setToggleDelete} index={index + obj.day} />
            </div>
            </>
          ))}
        </div>
      </>
    )
  }

  export default WeekView