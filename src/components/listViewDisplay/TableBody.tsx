import { EmptyTaskModal } from "../EmptytTaskModals/EmptyTaskModal"
import { Table } from "@mantine/core"
import TaskListLoadSkeleton from "./TaskListLoadSkeleton"
import { useAppState } from "../../store/AppState"

function TableBody({loadingComponent, listTasks, items}) {
  const {state} = useAppState()

  const TBody = () => (
    listTasks && listTasks.length > 0 ?
      <Table.Tbody className="!border-b-2 border-purple-400">
          {items} 
      </Table.Tbody> : 
      // loadingComponent && state.tasks?.length? 
      loadingComponent? 
      <TaskListLoadSkeleton /> : <EmptyTaskModal /> 
  )

  return (
    <TBody />
  )
}

export default TableBody