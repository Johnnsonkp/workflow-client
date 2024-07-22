import { ActionIcon, Button, Group, LoadingOverlay, ScrollArea, SimpleGrid, Table, TextInput, Textarea, Title } from '@mantine/core';
import { IconActivity, IconCircleCheck } from '@tabler/icons-react';
import { ThemeIcon, rem } from '@mantine/core';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(true)
  const [loadingComponent, setLoadingComponent] = useState(true)

  const {state, dispatch} = useAppState()

// let habitsObj = habitObj || []
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
    // console.log("Array.isArray(habitsObj)", Array.isArray(habitObj))
    
    habitObj && Array.isArray(habitObj) ? habitObj.forEach((habit, index) => {
        // console.log('index',index, habit.habit.title)

        if(index === habitObj.length){
            return
        }

        for(let i = 0; i < DateDisplay.length; i++){
            // console.log('i',i)
            
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

        const filterData = sortHabitLogs(data)
        setHabitObj(filterData)
        // setHabitObj(data)
    })
}

async function updateFormAction(row, entry, obj, title){

    // let filterHabit = habitObj.filter((habit) => {
    //     return habit.entries.filter((en) => {
    //         if(en.date.toString() === entry.date.toString() && title === habit.habit.title){
    //             console.log("if", en.date, en.complete)
    //             console.log("title", title)
    //             console.log("habit.habit.title", habit.habit.title)
    //             return en.complete = !en.complete
    //         }
    //     })
    // })

    // console.log("filterHabit", filterHabit)
    // setHabitObj(filterHabit)

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

const rows = Array.isArray(habitObj) ? habitObj.map((row, index) => (    
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
                <Table.Td key={dateIndex + index} className={`!overflow-hidden !px-0`}>
                    <div className='text-center !px-0'>
                        <p className={`${showDate? 'visible' : 'hidden'} text-xs`}>{obj.date} {obj.month}</p>
                        {
                        //  entry?.complete &&
                         entry &&
                            // <ThemeIcon key={dateIndex + index} onClick={() =>  updateFormAction(row, entry, obj)}  
                            //     color="teal" size={30} radius="xl" className='cursor-pointer'>
                            //     <hr z={0} className='absolute w-[200px] border border-green-500'></hr>
                            //     <IconCircleCheck className='absolute' z={1} style={{ width: rem(36), height: rem(40) }} /> 
                            // </ThemeIcon>  
                            <Group gap="0" className='!overflow-hidden !flex !items-center !justify-between !w-[100%]' align={'center'}>
                                <div className=' flex-[0.35]'>
                                    <hr className={`w-[100%] border ${entry?.complete && row?.entries[index - 1]?.complete && 'border-green-500' }  `}></hr>
                                </div>
                                <ThemeIcon key={dateIndex + index} color={`${entry?.complete? 'teal' : 'rgba(228, 230, 240)'}`} size={28} radius="xl" 
                                    className={`cursor-pointer px-0 mx-0 flex-[0.35] hover:${entry?.complete? '!bg-[rgba(228, 230, 240)]' : 'bg-teal-500'} `}>
                                    <IconCircleCheck style={{ width: rem(34), height: rem(38) }} onClick={() =>  updateFormAction(row, entry, obj, row.habit.title)}  /> 
                                </ThemeIcon> 
                                <div className=' flex-[0.35]'>
                                    <hr className={`w-[100%] border ${entry?.complete && row?.entries[index + 1]?.complete && 'border-green-500'}  `}></hr>
                                </div>
                            </Group>

// onClick={() =>  updateFormAction(row, entry, obj)} 
                            
                            // : 
                            // <ThemeIcon
                            //     key={dateIndex + index} 
                            //     color={`${toggleHabit.id === row.habit.id && toggleHabit.date === obj.date.toString() 
                            //         && checked? 'teal' : "rgba(228, 230, 240)"} 
                            //     `} 
                            //     size={30} radius="xl" className='cursor-pointer'>
                            //     <hr z={0} className={`${toggleHabit.id === row.habit.id && 
                            //     toggleHabit.date === obj.date.toString() && checked? 'visible' : 'hidden'
                            //     }  
                            //     absolute w-[200px] border border-green-500`}></hr>
                            //     <IconCircleCheck z={1} className='absolute hover:bg-teal-500 rounded-lg p-1' 
                            //         onClick={() =>  updateFormAction(row, entry, obj)}  
                            //     style={{ width: rem(46), height: rem(40) }} /> 
                            // </ThemeIcon> 
                            
                        }

                        {/* <Group gap="[0px]" >
                            {taskObj.status === 'complete'? 
                                <ThemeIcon color="teal" size={30} radius="xl">
                                    <IconCircleCheck style={{ width: rem(36), height: rem(40) }} /> 
                                </ThemeIcon> :
                                <ThemeIcon color="rgba(228, 230, 240)" size={30} radius="xl">
                                    <IconCircleFilled color="" style={{ width: rem(36), height: rem(40) }} /> 
                                </ThemeIcon>
                            }
                        </Group> */}
                    </div>
                </Table.Td> 
            )) 
        ))
        }
            <Table.Td className='flex'>
                <p>{row.habit.current_streak}</p>
            </Table.Td>
    </Table.Tr>
)) : null


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
            <Table.Tbody>{rows}</Table.Tbody>
            <Table.Tfoot className='border border-gray-200 h-5 !p-5'>
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

