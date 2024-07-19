import { ActionIcon, Button, Group, ScrollArea, SimpleGrid, Table, TextInput, Textarea, Title } from '@mantine/core';
import { IconActivity, IconCheck, IconCircleCheck } from '@tabler/icons-react';
import { ThemeIcon, rem } from '@mantine/core';
import { useEffect, useState } from 'react';

import CreateTaskForm from '../components/forms/CreateTaskForm';
import { IconPlus } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react'
import InnerTopNav from '../components/innerTopNav/InnerTopNav';
import { Modal } from '@mantine/core';
import { Tab } from '@mui/material';
import { TimeInput } from '@mantine/dates';
import WeekViewTab from '../components/weekView/WeekViewTab';
import { calculateWeek } from '../utils/dateUtills';
import { habitFormActions } from '../actions/habitActions';
import { useAppState } from '../store/AppState';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

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
let newDate = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})



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


const HabitsObj = [
    {   
        habit: {
            title: "Bible study",
            description: "Run before or after work",
            date_created: '16/07/24',
            current_streak: 2,
        },   
        entries: [
            {date: '14/07/24', complete: true},
            {date: '15/07/24', complete: true},
            {date: '16/07/24', complete: true},
            // {date: '20/07/24', complete: true},
        ]
    },
    {   
        habit: {
            title: "Meditate",
            description: "Meditate",
            date_created: '16/07/24',
            current_streak: 0,
        },   
        entries: [
            {date: '14/07/24', complete: true},
            {date: '15/07/24', complete: false},
            {date: '16/07/24', complete: true},
        ]
    },
    {   
        habit: {
            title: "Daily Run",
            description: "Daily run ",
            date_created: '16/07/24',
            current_streak: 0,
        },   
        entries: [
            {date: '14/07/24', complete: false},
            {date: '15/07/24', complete: true},
            {date: '16/07/24', complete: false},
        ]
    }
]

function Habits() {
  const [scrolled, setScrolled] = useState(false);
  const [checked, setChecked] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [tab1, setTab1] = useState('Week')
  const [opened, { open, close }] = useDisclosure(false);
  const [toggleHabit, setToggleHabit] = useState({
    id: '',
    date: ''
  })
  const [habitObj, setHabitObj] = useState()
  const navigate = useNavigate()

  const {state, dispatch} = useAppState()

  const newHabit = {
    id: 3,
    title: "Daily Run",
    description: "Run everyday for at least 10 minutes",
    current_streak: 0,
    date: '18/07/24', 
    complete: true,
  }

let habitsObj = habitObj || HabitsObj
function sortHabitLogs(habitsObj) {
    Array.isArray(habitsObj) && habitsObj.forEach((habit) => {
        for(let i = 0; i < DateDisplay.length; i++){
            if(habit.entries[i] && habit.entries[i].date.slice(0,2).toString() !== DateDisplay[i].date.toString()){
                habit.entries.unshift({date: `${DateDisplay[i].date}/${numMonth[DateDisplay[i].month]}/24`, complete: false})
            } 
            if(!habit.entries[i]){
                habit.entries.push({date: `${DateDisplay[i].date}/${numMonth[DateDisplay[i].month]}/24`, complete: false})
            } 
            habit.entries.sort((a,b) => a.date.slice(0, 2) - b.date.slice(0, 2))
        }
    })
    return habitsObj
}

function HabitForm() {
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            current_streak: 0,
            complete: false,
        },
        validate: {
          title: (value) => value.trim().length < 2,
        },
    });

    const handleFormSubmit = async (form) => {
        const creatAction = await habitFormActions['create']
        creatAction(form.values, state.user).then((data) => {
            console.log("Data:", data)
            navigate('/habits')
        })
    }


    return(
        <form 
            className='flex-row items-center justify-center bg-white m-auto rounded-md px-7'
            onSubmit={form.onSubmit(() => handleFormSubmit(form))}
        >
            <Title
                order={2}
                size="h2"
                style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                fw={600}
                ta="left"
             >
                Add New Habit
            </Title>
            <hr className='mt-2'></hr>
            
            <SimpleGrid cols={{ base: 1, sm: 2, md: 1 }} mt="md">
                <TextInput
                    label="Habit Name"
                    placeholder="Habit Name"
                    name="title"
                    variant="filled"
                    size='md'
                    {...form.getInputProps('title')}
                />
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
            </SimpleGrid>
            <hr className='mt-7'></hr>
            <Group justify="right" mt="xl">
                <Button type="submit" size="sm" onClick={() => navigate('/habits')}>
                    Cancel
                </Button>
                <Button type="submit" size="sm">
                    Create
                </Button>
            </Group>
        </form>
    )
}


async function deleteHabit(obj){
    console.log("obj:", obj)
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
        setHabitObj(data)
    })
}

async function updateFormAction(row, entry, obj){
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

    console.log("updateObj", updateObj)
    console.log("updateObj", row)

    updateAction(updateObj, state.user).then((data) => {
        console.log("Data:", data)
        setHabitObj(data)
    })
}

const data = [
    { label: 'Week View', value: 'Week' },
    { label: 'hidden view', value: 'hidden' }
]

useEffect(() => {
    fetchFormAction()
}, [])

const rows = Array.isArray(habitsObj) && sortHabitLogs(habitsObj).map((row, index) => (
    
    <Table.Tr key={row.habit.title}>
        <Table.Td className='flex justify-between'>
            <div className='flex'><IconActivity /> <p>{row.habit.title}</p></div>
            <ActionIcon variant="subtle" color="red" onClick={() => deleteHabit(row.habit)} >
                <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
        </Table.Td>
        {
        DateDisplay.map((obj, dateIndex) => (
            row?.entries && row.entries.map((entry, index) => (
            entry.date.slice(0, 2) === obj.date.toString() &&
                <Table.Td key={dateIndex + index} className={`overflow-hidden `}>
                    <div className='text-center'>
                        <p className={`${showDate? 'visible' : 'hidden'}`}>{obj.date}</p>
                        {entry?.complete ?
                            <ThemeIcon key={dateIndex + index} onClick={() =>  updateFormAction(row, entry, obj)}  
                                color="teal" size={30} radius="xl" className='cursor-pointer'>
                                <hr z={0} className='absolute w-[200px] border border-green-500'></hr>
                                <IconCircleCheck className='absolute' z={1} style={{ width: rem(36), height: rem(40) }} /> 
                            </ThemeIcon>  : 
                            <ThemeIcon
                                key={dateIndex + index} 
                                color={`${toggleHabit.id === row.habit.id && toggleHabit.date === obj.date.toString() 
                                    && checked? 'teal' : "rgba(228, 230, 240)"} 
                                `} 
                                size={30} radius="xl" className='cursor-pointer'>
                                <hr z={0} className={`${toggleHabit.id === row.habit.id && 
                                toggleHabit.date === obj.date.toString() && checked? 'visible' : 'hidden'
                                }  
                                absolute w-[200px] border border-green-500`}></hr>
                                <IconCircleCheck z={1} className='absolute hover:bg-teal-500 rounded-lg p-1' 
                                    onClick={() =>  updateFormAction(row, entry, obj)}  
                                style={{ width: rem(46), height: rem(40) }} /> 
                            </ThemeIcon> 
                        }
                    </div>
                </Table.Td> 
            )) 
        ))
        }
            <Table.Td className='flex'>
                <p>{row.habit.current_streak}</p>
            </Table.Td>
    </Table.Tr>
));

  return (
    <div className='min-h-[80vh] mb-10'>
      <InnerTopNav title={'Habits'} tab1={'Week view'} setTab1={setTab1} data={data}/>
      <div className='flex w-[50%] justify-between m-2'>
        <Button size='xs' onClick={() => setShowDate(!showDate)}>Show habit date</Button>
      </div>
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
                            {/* <div className={`flex `}> */}
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
            <Table.Tbody>{rows}</Table.Tbody>
            <Table.Tfoot className='border border-gray-200 h-5 !p-5'>
                <p className='p-1'>Habit count: {Array.isArray(habitsObj) && habitsObj.length || 0 }</p>
            </Table.Tfoot>
            </Table>
        </ScrollArea> : 'nothing'
      }

        <Button onClick={open} onClose={close} 
            className={`shadow-lg`}
        >
            <IconPlus size={30} className={`!transition-all !duration-500 `}/>
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
            <HabitForm />
        </Modal>
    
    </div>
  );
}

export default Habits

