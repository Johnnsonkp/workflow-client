import React, {useEffect, useState} from 'react'

import { Table } from '@mantine/core'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableHead from './TableHead'
import TimeLogs from '../timeLogComp/timeLog'
import classes from './list.module.css'
import { useAppState } from '../../store/AppState'

function TableUI({items, listTasks, setArchieve, showArchive, activePage, setPage}) {
    const [loading, setLoading] = useState(true)
    const [loadingComponent, setLoadingComponent]: any = useState(true)
    const paginationCount =  Math.ceil(listTasks?.length / 7) 
    let darkMode = JSON.parse(localStorage.getItem('dark_mode'))

    useEffect(() => {
        let loadingDelay = setTimeout(() => {
          if(items && listTasks && listTasks.length > 0 ){
            console.log("listViewTask")
            setLoadingComponent(false)
          }
        }, 200)
        return () => {
          clearTimeout(loadingDelay)
        }
    }, [])

  return (
    // <div className='flex'>
    // <TimeLogs />
    <div 
      className={`${classes.listTable} w-[99%] m-[auto] h-[] cursor-pointer border border-#D1D1D1 bg-white rounded-md mt-10 mb-5 ${darkMode && 'border-1 border-[#33323F]' } ${darkMode && ' !bg-[#191622] text-[#fff]' }`}
    >
      <Table.ScrollContainer minWidth={800} className='overflow-hidden'>
        <Table
          verticalSpacing="xs" 
          striped={true}
          withColumnBorders={false}
          className={`${listTasks && listTasks.filter((task) => task.number == null).length > 2? 'min-h-[250px]' : 
          listTasks && listTasks.filter((task) => task.number == null).length == 1 && 'min-h-[130px]'} 
            ${listTasks.filter((task) => task.number == null).length < 1 && 'h-[240px]'}`}
        >
          <TableHead 
            setArchieve={setArchieve} 
            showArchive={showArchive}
          />
          <TableBody 
            listTasks={listTasks} 
            items={items}
          />
        </Table>
        <TableFooter 
          paginationCount={paginationCount} 
          activePage={activePage} 
          setPage={setPage}
        />
      </Table.ScrollContainer>
      {/* <TimeLogs /> */}
    </div>
  )
}

export default TableUI