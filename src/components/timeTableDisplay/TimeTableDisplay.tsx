import { Anchor, Card, Group, Progress, Table, Text } from '@mantine/core';
import React, {useEffect, useState} from 'react'

import SmallTaskCard from '../smallTaskCard/SmallTaskCard'

interface Task {
    title: string;
    description: string;
    time_to_start: string;
    status: string;
    time_to_complete: string;
    order: number;
}
interface TimeView {
    time: string;
    task?: Task | any
}
interface Props {
    taskObj: Task[] | undefined;
    task: Task;
    deleteTask: (task: Task, deleteTask: Task[] | undefined) => void;
}


const TimeTableDisplay: React.FC<Props> = ({taskObj, task, deleteTask}) => {
    const [toggleDelete, setToggleDelete] = useState({
      task: undefined,
      toggle: false
    })

    const [showRedLine, setShowRedLine] = useState(false)


    useEffect(() => {
      if(toggleDelete.toggle){
        toggleDelete.task && deleteTask(toggleDelete.task, taskObj)

        setToggleDelete({
          task: undefined,
          toggle: false
        })
      }
    }, [toggleDelete])


    const timeView: TimeView[] = [
        {
          time: '12:00 AM',
          task: []
        },
        {
          time: '12:30 AM',
          task: []
        },
        {
          time: '01:00 AM',
          task: []
        },
        {
          time: '01:30 AM',
          task: []
        },
        {
          time: '02:00 AM',
          task: []
        },
        {
          time: '02:30 AM',
          task: []
        },
        {
          time: '03:00 AM',
          task: []
        },
        {
          time: '03:30 AM',
          task: []
        },
        {
          time: '04:00 AM',
          task: []
        },
        {
          time: '04:30 AM',
          task: []
        },  
        {
          time: '05:00 AM',
          task: []
        },
        {
          time: '05:30 AM',
          task: []
        },
        {
          time: '06:00 AM',
          task: []
        },
        {
          time: '06:30 AM',
          task: []
        },
        {
          time: '07:00 AM',
          task: []
        },
        {
          time: '07:30 AM',
          task: []
        },
        {
          time: '08:00 AM',
          task: []
        }, 
        {
          time: '08:30 AM',
          task: []
        },
        {
          time: '09:00 AM',
          task: []
        },
        {
          time: '09:30 AM',
          task: []
        },
        {
          time: '10:00 AM',
          task: []
        },
        {
          time: '10:30 AM',
          task: []
        },
        {
          time: '11:00 AM',
          task: []
        },
        {
          time: '11:30 AM',
          task: []
        }, 
        {
          time: '12:00 PM',
          task: []
        },
        {
          time: '12:30 PM',
          task: []
        },
        {
          time: '01:00 PM',
          task: []
        },
        {
          time: '01:30 PM',
          task: []
        },
        {
          time: '02:00 PM',
          task: []
        },
        {
          time: '02:30 PM',
          task: []
        },
        {
          time: '03:00 PM',
          task: []
        },
        {
          time: '03:30 PM',
          task: []
        },
        {
          time: '04:00 PM',
          task: []
        },
        {
          time: '04:30 PM',
          task: []
        }, 
        {
          time: '05:00 PM',
          task: []
        },
        {
          time: '05:30 PM',
          task: []
        },
        {
          time: '06:00 PM',
          task: []
        },
        {
          time: '06:30 PM',
          task: []
        },
        {
          time: '07:00 PM',
          task: []
        },
        {
          time: '07:30 PM',
          task: []
        },
        {
          time: '08:00 PM',
          task: []
        }, 
        {
          time: '08:30 PM',
          task: []
        }, 
        {
          time: '09:00 PM',
          task: []
        },
        {
          time: '09:30 PM',
          task: []
        },
        {
          time: '10:00 PM',
          task: []
        },
        {
          time: '10:30 PM',
          task: []
        },
        {
          time: '11:00 PM',
          task: []
        },
        {
          time: '11:30 PM',
          task: []
        }
    ]

    // let timeViewArr = []
    // let num = 29

    // timeView.forEach((timeTaskObj) => {
    //   timeViewArr.push(timeTaskObj)

    //   for(let i = 0; i < 29; i++){
    //     // timeTaskObj.time.replace('AM', '')
    //     // timeTaskObj.time.replace('PM', '')
    //     timeTaskObj.time.replace(':', '')
    //     let timeToNum = Number(timeTaskObj.time)
    //     let addToTime = timeToNum++

    //     console.log("timeTaskObj", timeTaskObj)
    //     console.log("timeToNum", timeToNum)
    //     console.log("addToTime", addToTime)
    //     console.log("i", i)
    //   }
    // })

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

    let newDate = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    let timeNowFirstTwoDigits = convertTo12hrFormat(newDate).charAt(0) + convertTo12hrFormat(newDate).charAt(1)
    let timeNowLastTwoDigits = convertTo12hrFormat(newDate).charAt(6) + convertTo12hrFormat(newDate).charAt(7)

    const rows = timeView.map((row) => {
        taskObj?.forEach((obj) => {
            if(row.time == obj?.time_to_start){
                row.task?.push(obj)
            }
        })
        return(
          <Table.Tr key={row.time}>
            <Table.Td className='w-[7%] text-[13px]'>
                <Anchor component="button" fz="sm" className='!text-[10px] table-time'>
                    {row.time}
                </Anchor>
            </Table.Td>

            <hr className={`border border-red-500 w-[100%] hidden ${row.time.charAt(0) + row.time.charAt(1) == timeNowFirstTwoDigits && row.time.charAt(6) + row.time.charAt(7) == timeNowLastTwoDigits && '!visible'}`}></hr>
            
            <Table.Td className='text-[12px] w-[23%] !p-0'>
                {row.task && row.task[0]?.title && 
                  <SmallTaskCard task={row?.task[0]} toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />}
            </Table.Td>

            <Table.Td className='text-[12px] w-[23%] !p-0'>
                {row.task && row.task[1]?.title && 
                  <SmallTaskCard task={row?.task[1]} toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />}
            </Table.Td>

            <Table.Td className='text-[12px] w-[23%] !p-0'>
                {row.task && row.task[2]?.title && 
                  <SmallTaskCard task={row?.task[2]} toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />}
            </Table.Td>
            
            <Table.Td className='text-[12px] w-[23%] !p-0'>
                {row.task && row.task[3]?.title && 
                <SmallTaskCard task={row?.task[3]} toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />}
            </Table.Td>
          </Table.Tr>
        )
  })

    const TimeDisplay = () => {
        return (
          <Table.ScrollContainer 
            minWidth={800}
            type={'native'}
            className='border border-#D1D1D1 bg-white shadow-md rounded-md h-[80vh]'>
            <Table 
              verticalSpacing="md"
              stickyHeader={true}
              highlightOnHover={true}
              striped={true}
              withColumnBorders={true}
            >
              <Table.Thead className='!bg-[#F4F4F4]'>
                <Table.Tr>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Tasks</Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
    
              <Table.Tbody className='cursor-pointer h-[500px] overflow-scroll'>
                {rows}
              </Table.Tbody>
    
              <Table.Caption className="sticky bottom-0">
                <div className='flex align-middle bg-[#F4F4F4] border border-#D1D1D1'>
                  <div className="p-2 flex align-middle text-[12px]">
                    <div className='border border-blue-500 my-[auto] mr-1 px-[5px] h-[12px] bg-blue-500'></div>To do</div>
                  <div className="p-2 flex align-middle text-[12px]"><div className='border border-orange-500 my-[auto] mr-1 px-[5px] h-[12px] bg-orange-500'></div>In Progress</div>
                  <div className="p-2 flex align-middle text-[12px]"><div className='border border-green-500 my-[auto] mr-1 px-[5px] h-[12px] bg-green-500'></div>Complete</div>
                  <div className="p-2 flex align-middle text-[12px]"><div className='border border-red-500 my-[auto] mr-1 px-[5px] h-[12px] bg-red-500'></div>Overdue</div>
                </div>
              </Table.Caption>
            </Table>
          </Table.ScrollContainer>
        )
    }

  return (
    <>
        <TimeDisplay />
    </>
  )
}

export default TimeTableDisplay