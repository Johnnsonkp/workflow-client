import { ActionIcon, Button, Group, LoadingOverlay, ScrollArea, SimpleGrid, Table, TextInput, Textarea, Title } from '@mantine/core';
import { IconActivity, IconCircleCheck } from '@tabler/icons-react';
import { ThemeIcon, rem } from '@mantine/core';
import { useEffect, useState } from 'react';

import { HabitForm } from '../components/forms/HabitForm';
import { HabitRows } from '../components/habitRows/HabitRows';
import { HabitsObj } from '../components/habitRows/HabitsObj';
import { IconPlus } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react'
import InnerTopNav from '../components/innerTopNav/InnerTopNav';
import { Modal } from '@mantine/core';
import { calculateWeek } from '../utils/dateUtills';
import { habitFormActions } from '../actions/habitActions';
import { useAppState } from '../store/AppState';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const numMonth = {
    'January': '01',
    'July': '07'
}
var today = new Date();
var yyyy = today.getFullYear();
var mm = today.getMonth() + 1; // Months start at 0!
var dd = today.getDate();
const todaysDate = today.getDate();
if (dd < 10) dd = 0 + dd;
if (mm < 10) mm = 0 + mm;
var formattedToday = mm + '/' + dd + '/' + yyyy;



const GetDays = (formattedToday, days, months) => {
    const dateObj = []
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

const DateDisplay = GetDays(formattedToday, days, months)

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
);

function Habits() {
  const [scrolled, setScrolled] = useState(false);
  const [checked, setChecked] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [tab1, setTab1] = useState('Week')
  const [opened, { open, close }] = useDisclosure(false);
  const [toggleHabit, setToggleHabit] = useState({id: '', date: ''})
  const [habitObj, setHabitObj] = useState()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadingComponent, setLoadingComponent] = useState(true)
  const {state, dispatch} = useAppState()

function removeDuplicateEntries(data) {
    const seenDates = new Set();
    data.entries = data.entries.filter(entry => {
      const isDuplicate = seenDates.has(entry.date);
      seenDates.add(entry.date);
      return !isDuplicate;
    });
    return data;
  }

let habitsObj = habitObj
function sortHabitLogs(habitObj) {
    habitObj && Array.isArray(habitObj) ? habitObj.forEach((habit, index) => {
        if(index === habitObj.length){
            return
        }
        for(let i = 0; i < DateDisplay.length; i++){
            if(habit.entries[i] && habit.entries[i].date.slice(0,2).toString() !== DateDisplay[i].date.toString()){
                let habitEntries = removeDuplicateEntries(habit)
                habitEntries.entries.push({date: `${DateDisplay[i].date}/${numMonth[DateDisplay[i].month]}/24`, complete: false})
                
            } else if(!habit.entries[i]){
                let habitEntries = removeDuplicateEntries(habit)
                habitEntries.entries.push({date: `${DateDisplay[i].date}/${numMonth[DateDisplay[i].month]}/24`, complete: false})
            }
        }
    }) : null
    return habitObj
}


async function deleteHabit(obj){
    const deleteAction = await habitFormActions['delete']
    deleteAction(state.user, obj.id).then((data) => {
        console.log("Data:", data)
        navigate('/habits')
    })
}

async function fetchFormAction(){
    const getAction = await habitFormActions['get']
    getAction(state.user).then((data) => {
        console.log("Data:", data)

        const filterData = sortHabitLogs(data)
        setHabitObj(filterData)
    })
}

async function updateFormAction(row, entry, obj, title){

    const updateAction = await habitFormActions['update']
    let updateObj = {
        id: row.habit.id,
        date: `${obj.date}/${numMonth[obj.month]}/${obj.year.toString().replace('20','')}`,
        complete: !entry.complete,
        user_id: state.user.user_id
    }
    setToggleHabit({
      id: row.habit.id,
      date: entry.date.slice(0,2)
    })
    setChecked(!checked)


    console.log("Before update", updateObj)
    
    updateAction(updateObj, state.user).then((data) => {
        console.log("update data Data:", data)
        // setHabitObj(data)
    })

    let filterHabit = habitObj.filter((habit) => {
        return habit.entries.filter((en) => {
            if(en.date.toString() === entry.date.toString() && title === habit.habit.title){
                console.log("if", en.date, en.complete)
                console.log("title", title)
                console.log("habit.habit.title", habit.habit.title)
                return en.complete = !en.complete
            }
        })
    })

    console.log("filterHabit", filterHabit)
    setHabitObj(filterHabit)
}

const data = [
    { label: 'Week View', value: 'Week' },
    { label: 'hidden view', value: 'hidden' }
]

useEffect(() => {
    let loadingDelay = setTimeout(() => {
        if(loading === true){
            fetchFormAction()
            setLoadingComponent(false)
            setLoading(false)
        }
    }, 200)
    return () => {
        clearTimeout(loadingDelay)
    }
}, [])

  return (loadingComponent?  <LoadingOverlay color='darkgray' zIndex={'0'} visible={true} overlayProps={{ radius: "sm", blur: 2 }} /> : 
    <div className='min-h-[80vh] mb-10'>
      <InnerTopNav title={'Habits'} tab1={'Week view'} setTab1={setTab1} data={data}/>
      {
        tab1 === 'Week'? 
        <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)} border={'true'} className='border border-#D1D1D1 rounded-md shadow-md '>
            <Table miw={700} withColumnBorders={true} >
            <Table.Thead className={''}>
                <Table.Tr>
                <Table.Th>Habit</Table.Th>
                {
                    DateDisplay.map((obj, index) => (
                        <Table.Th key={index} className={` text-[12px]  `}>
                            <div className={`flex ${obj.date === todaysDate? 'bg-blue-400 text-white font-bold px-2 rounded-lg' : ''}`}>
                                <p className={`px `}>{obj.day.slice(0, 3)}</p>
                                <p className={`px-1 `}>{obj.date}</p>
                                <p className={`px `}>{obj.month}</p>
                            </div>
                        </Table.Th>        
                    ))
                }
                <Table.Th className={` text-[12px]`}>Current Streak</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {<HabitRows 
                    habitObj={habitObj}
                    deleteHabit={deleteHabit} 
                    showDate={showDate} 
                    DateDisplay={DateDisplay} 
                    updateFormAction={updateFormAction}
                />}
            </Table.Tbody>
            <Table.Tfoot className='border border-gray-200 h-5 !p-5 bg-[#F1F3F5]'>
                <p className='p-2 text-xs'>Habit count: {Array.isArray(habitsObj) && habitsObj.length || 0 }</p>
            </Table.Tfoot>
            </Table>
        </ScrollArea> : 'nothing'
      }
        <div className='flex justify-end m-2 mt-4'>
            <Button className='m-2' size='xs' onClick={() => setShowDate(!showDate)}>Show habit date</Button>
            <Button size='xs' onClick={open} onClose={close} className={`shadow-lg m-2`}>
                <IconPlus size={20} className={`!transition-all !duration-500 `}/>
            </Button>
        </div>

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
            <HabitForm />
        </Modal>
    
    </div>
  );
}

export default Habits

