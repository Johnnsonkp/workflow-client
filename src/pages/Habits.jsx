import { Box, ThemeIcon, rem } from '@mantine/core';
import { LoadingOverlay, ScrollArea, Table } from '@mantine/core';
import { calculateWeek, monthsArr, numMonth } from '../utils/dateUtills';
import { useEffect, useState } from 'react';

import HabitBtnGroup from '../components/habitRows/HabitBtnGroup';
import { HabitForm } from '../components/forms/HabitForm';
import { HabitRows } from '../components/habitRows/HabitRows';
import { HabitsObj } from '../components/habitRows/HabitsObj';
import InnerTopNav from '../components/innerTopNav/InnerTopNav';
import { Modal } from '@mantine/core';
import { WeekHabitsDisplay } from '../components/habitRows/WeekHabitsDisplay';
import { calculateMonth } from '../utils/dateUtills';
import { habitFormActions } from '../actions/habitActions';
import { useAppState } from '../store/AppState';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var today = new Date();
var yyyy = today.getFullYear();
var mm = today.getMonth() + 1; // Months start at 0!
var dd = today.getDate();
const todaysDate = today.getDate();
if (dd < 10) dd = 0 + dd;
if (mm < 10) mm = 0 + mm;
var formattedToday = mm + '/' + dd + '/' + yyyy;

const GetDays = (formattedToday, days, monthsArr) => {
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
        "month": monthsArr[dates[i].getMonth()],
        "year": dates[i].getFullYear(),
        "full_date": dates[i].getDate() + '/' + monthsArr[dates[i].getMonth()] + '/' + dates[i].getFullYear()
     })
    }
    return dateObj 
}

const GetMonth = (days, monthsArr) => {
    const dateObj = []
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var lastDateOfMonth = lastDay.getDate()

    var yyyy = firstDay.getFullYear();
    var mm = firstDay.getMonth() + 1; // Months start at 0!
    var dd = firstDay.getDate();
    if (dd < 10) dd = 0 + dd;
    if (mm < 10) mm = 0 + mm;
    var formattedToday = mm + '/' + dd + '/' + yyyy;
    var newDate = new Date(formattedToday);
    var dates = new Array();
    dates = calculateMonth(newDate, lastDateOfMonth);
    
    for(let i=0; i < dates.length; i++){
        dateObj.push({
            "day": days[dates[i].getDay()],
            "date": dates[i].getDate(),
            "month": monthsArr[dates[i].getMonth()],
            "year": dates[i].getFullYear(),
            "full_date": dates[i].getDate() + '/' + monthsArr[dates[i].getMonth()] + '/' + dates[i].getFullYear()
        })
    }

    return dateObj 
}

const DateDisplay = GetDays(formattedToday, days, monthsArr)
const MonthDisplay = GetMonth(days, monthsArr)
let firstElement = MonthDisplay.shift();

// console.log("Month display", MonthDisplay)
// console.log("DateDisplay display", DateDisplay)
// console.log("firstDay", firstDay)
// console.log("lastDay", lastDay)

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
  const [activeTab, setActiveTab] = useState('Week')
  const [opened, { open, close }] = useDisclosure(false);
  const [toggleHabit, setToggleHabit] = useState({id: '', date: ''})
  const [habitObj, setHabitObj] = useState()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadingComponent, setLoadingComponent] = useState(true)
  const {state, dispatch} = useAppState()
  const [habitView, setHabitView] = useState(DateDisplay)
  const [habitWeekObj, setHabitWeekObj] = useState()
  const [habitMonthObj, setHabitMonthObj] = useState()

function removeDuplicateEntries(data) {
    const seenDates = new Set();
    data.entries = data.entries.filter(entry => {
      const isDuplicate = seenDates.has(entry.date);
      seenDates.add(entry.date);
      return !isDuplicate;
    });
    
    return data;
  }

  function parseDate(dateStr) {
    let [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year + 2000, month - 1, day < 10? 0 + day : day); // Adding 2000 to year to handle the YY format

  }

function sortHabitLogs(habitObj, view) {
    habitObj && Array.isArray(habitObj) ? habitObj.forEach((habit, index) => {
        if(index === habitObj.length){
            return
        }
        for(let i = 0; i < view.length; i++){
            let habitEntries = habit
            if(!habit.entries[i]){
                habitEntries.entries.push({date: `${view[i].date}/${numMonth[view[i].month]}/24`, complete: false})
            } else if(habit.entries[i] && habit.entries[i].date.slice(0,2).toString() !== view[i].date.toString()){
                habitEntries.entries.push({date: `${view[i].date}/${numMonth[view[i].month]}/24`, complete: false})
            }
            habitEntries.entries.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        }
        removeDuplicateEntries(habit)
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
        // console.log("fetchFormAction:", data)
        setHabitObj(data)
    })
}

async function updateFormAction(row, entry, obj, title){

    const updateAction = await habitFormActions['update']
    let updateObj = {
        id: row.habit.id,
        // date: `${obj.date}/${numMonth[obj.month]}/${obj.year.toString().replace('20','')}`,
        date: entry.date,
        complete: !entry.complete,
        user_id: state.user.user_id
    }
    setToggleHabit({
      id: row.habit.id,
      date: entry.date.slice(0,2)
    })
    setChecked(!checked)
    
    updateAction(updateObj, state.user).then((data) => {
        console.log("update data Data:", data)
    })

    let filterHabit = habitObj.filter((habit) => {
        return habit.entries.filter((en) => {
            if(en.date.toString() === entry.date.toString() && title === habit.habit.title){
                return en.complete = !en.complete
            }
        })
    })

    console.log("filterHabit", filterHabit)
    setHabitObj(filterHabit)
}

const data = [
    { label: 'Week View', value: 'Week' },
    { label: 'Month view', value: 'Month' }
]

useEffect(() => {
    let loadingDelay = setTimeout(() => {
        if(loading === true){
            if(!habitObj) { fetchFormAction()}
            // setLoadingComponent(false)
            setLoading(false)
        }
        setLoadingComponent(false)
    }, 200)
    //    }, 500)
    return () => {
        clearTimeout(loadingDelay)
    }
}, [activeTab, habitView, habitObj, habitWeekObj])

const WeekDateDisplay = () => {
       return  <>
            <Table.Thead className={''}>
                <Table.Tr>
                    <Table.Th className={''}>Habit</Table.Th>
                    { DateDisplay.map((obj, index) => (
                        <Table.Th key={index} className={` text-[12px]  `}>
                            <div className={`flex ${obj.date === todaysDate? 'bg-blue-400 text-white font-bold px-2 rounded-lg' : ''}`}>
                                <p className={`px `}>{obj.day.slice(0, 3)}</p>
                                <p className={`px-1 `}>{obj.date}</p>
                                <p className={`px `}>{obj.month}</p>
                            </div>
                        </Table.Th>        
                    ))}

                    <Table.Th className={` text-[12px]`}>Current Streak</Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {<WeekHabitsDisplay 
                    habitObj={habitObj}
                    deleteHabit={deleteHabit} 
                    showDate={showDate} 
                    DateDisplay={DateDisplay} 
                    // DateDisplay={habitView}
                    updateFormAction={updateFormAction}
                    habitWeekObj={habitWeekObj}
                    habitMonthObj={habitMonthObj}
                />}
            </Table.Tbody>
        </>

}
const MonthDateDisplay = () => (
    <>
        <Table.Thead className={''}>
            <Table.Tr>
                <Table.Th className={''}>Habit</Table.Th>
                    { MonthDisplay.map((obj, index) => (
                        <Table.Th key={index} className={` text-[12px]  `}>
                            <div className={`flex ${obj.date === todaysDate? 'bg-blue-400 text-white font-bold px-2 rounded-lg' : ''}`}>
                                <p className={`px `}>{obj.day.slice(0, 3)}</p>
                                <p className={`px-1 `}>{obj.date}</p>
                                <p className={`px `}>{obj.month}</p>
                            </div>
                        </Table.Th>        
                    ))}
                <Table.Th className={` text-[12px]`}>Current Streak</Table.Th>
            </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
            <HabitRows 
                MonthDisplay={MonthDisplay}
                habitObj={habitObj}
                deleteHabit={deleteHabit} 
                showDate={showDate} 
                updateFormAction={updateFormAction}
                DateDisplay={DateDisplay} 
            />
        </Table.Tbody>
    </>
)

const HabitViewDisplay = () => {
    let filterData = sortHabitLogs(habitObj, DateDisplay)
    let filterData2 = sortHabitLogs(habitObj, MonthDisplay)

    {
      switch(activeTab){
        case "Week":
          setHabitWeekObj(filterData)
          return <WeekDateDisplay />
          break;
          
        case "Month":
          setHabitMonthObj(filterData2)
         return <MonthDateDisplay />
          break;
      }
    }
}

  return (
    <Box pos="relative">
        <LoadingOverlay  zIndex={'1000'} visible={loadingComponent} overlayProps={{ radius: "sm", blur: 2 }} /> 
        <div className='min-h-[80vh] mb-10'>
            <InnerTopNav title={'Habits'} tab1={'Week view'} tab2={'Month view'} setTab1={setTab1} data={data} activeTab={activeTab} setActiveTab={setActiveTab}/>

            <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)} border={'true'} className='border border-#D1D1D1 rounded-md shadow-md '>
                <Table miw={700} withColumnBorders={true} >
                    <HabitViewDisplay />
                    <Table.Tfoot className='border border-gray-200 h-5 !p-5 bg-[#F1F3F5]'>
                        <p className='p-2 text-xs'>Habit count: {Array.isArray(habitObj) && habitObj?.length || 0 }</p>
                    </Table.Tfoot>
                </Table>
            </ScrollArea> 
            
            <HabitBtnGroup 
                open={open} 
                close={close} 
                showDate={showDate} 
                setShowDate={setShowDate}
            />
            
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
    </Box>
  )
}

export default Habits

