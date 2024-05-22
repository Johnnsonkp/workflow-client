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
          time: '09:00 AM',
          task: []
        },
        {
          time: '10:00 AM',
          task: []
        },
        {
          time: '11:00 AM',
          task: []
        }, 
        {
          time: '12:00 PM',
          task: []
        },
        {
          time: '01:00 PM',
          task: []
        },
        {
          time: '02:00 PM',
          task: []
        },
        {
          time: '03:00 PM',
          task: []
        },
        {
          time: '04:00 PM',
          task: []
        }, 
        {
          time: '05:00 PM',
          task: []
        },
        {
          time: '06:00 PM',
          task: []
        },
        {
          time: '07:00 PM',
          task: []
        },
        {
          time: '08:00 PM',
          task: []
        }, 
        {
          time: '09:00 PM',
          task: []
        },
        {
          time: '10:00 PM',
          task: []
        },
        {
          time: '11:00 PM',
          task: []
        }
    ]

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