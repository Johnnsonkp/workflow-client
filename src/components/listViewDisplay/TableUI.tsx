import React, {useEffect, useState} from 'react'

import { Table } from '@mantine/core'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableHead from './TableHead'
import TimeLogs from '../timeLogComp/timeLog'
import classes from './list.module.css'

function TableUI({items, listTasks, setArchieve, showArchive, activePage, setPage}) {
    const [loading, setLoading] = useState(true)
    const [loadingComponent, setLoadingComponent]: any = useState(true)
    const paginationCount =  Math.ceil(listTasks?.length / 7) 
    let darkMode = JSON.parse(localStorage.getItem('dark_mode'))

    useEffect(() => {
        let loadingDelay = setTimeout(() => {
          if(items){
            console.log("listViewTask")
            setLoadingComponent(false)
            setLoading(false)
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
            loadingComponent={loadingComponent}
            setArchieve={setArchieve} 
            showArchive={showArchive}
          />
          <TableBody 
            loadingComponent={loadingComponent} 
            listTasks={listTasks} 
            items={items}
          />
        </Table>
        <TableFooter 
          loadingComponent={loadingComponent} 
          paginationCount={paginationCount} 
          activePage={activePage} 
          setPage={setPage}
        />
      </Table.ScrollContainer>
      {/* <TimeLogs /> */}

      {/* <div className='border border-red-400 w-52'>
        <p>What I've done</p>
      </div> */}
      
    </div>
    // </div>
  )
}

export default TableUI