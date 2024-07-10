import { EmptyTaskModal } from "../EmptytTaskModals/EmptyTaskModal"
import { Table } from "@mantine/core"
import TaskListLoadSkeleton from "./TaskListLoadSkeleton"

function TableBody({loadingComponent, listTasks, items}) {

  const TBody = () => (
    loadingComponent? <TaskListLoadSkeleton /> : 
    listTasks && listTasks.length > 0 &&
        <Table.Tbody className="!border-b-2 border-purple-400">
            {items} 
        </Table.Tbody> 
  
  )

  return (
    listTasks && listTasks.length > 0? <TBody /> : <EmptyTaskModal />
  )
}

export default TableBody