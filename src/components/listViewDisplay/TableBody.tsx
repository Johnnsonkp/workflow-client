import react, {useEffect, useState} from 'react'

import { EmptyTaskModal } from "../EmptytTaskModals/EmptyTaskModal"
import { Table } from "@mantine/core"
import TaskListLoadSkeleton from "./TaskListLoadSkeleton"
import { useAppState } from "../../store/AppState"

function TableBody({ listTasks, items}) {
  const {state} = useAppState()
  const [loading, setLoading] = useState(true)

  const TBody = () => (
    listTasks && listTasks.length > 0 ?
      <Table.Tbody className="!border-b-2 border-purple-400">
          {items || <TaskListLoadSkeleton /> } 
      </Table.Tbody> 
      :
      <EmptyTaskModal  />
  )

  return (
    <TBody />
  )
}

export default TableBody