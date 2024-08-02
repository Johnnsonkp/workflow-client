import ArchiveBtnComp from "./ArchiveBtnComp"
import { Table } from "@mantine/core"
import { useAppState } from '../../store/AppState'

function TableHead({setArchieve, showArchive, loadingComponent}) {
  const {state} = useAppState()
  
  return (
    <Table.Thead className={``}>
      <Table.Tr p={'xs'} className="text-[13px] h-11 w-[100%] flex" fw={600}>
          <Table.Th fw={500} className="flex-[0.1] self-center">
            {!loadingComponent && state.tasks?.length && "Complete" }
          </Table.Th>
          <Table.Th fw={500} className="flex-[0.4] self-center">
            {!loadingComponent && state.tasks?.length &&  "Name"}
          </Table.Th>
          <Table.Th fw={500} className="flex-[0.1] self-center">
            {!loadingComponent && state.tasks?.length && "Status"}
          </Table.Th>
          <Table.Th fw={500} className="flex-[0.1] self-center">
            {!loadingComponent && state.tasks?.length && "Task Date"}
          </Table.Th>
          <Table.Th fw={500} className="flex-[0.1] self-center">
            {!loadingComponent && state.tasks?.length && "Start - Finish"}
          </Table.Th>
          <Table.Th fw={500} className="flex-[0.1] self-center">
            {!loadingComponent && state.tasks?.length && "Project" }
          </Table.Th>
          <Table.Th className="flex-[0.1] self-center">{!loadingComponent && state.tasks?.length && 
            <ArchiveBtnComp showArchive={showArchive} setArchieve={setArchieve}/>}
          </Table.Th>
      </Table.Tr>
    </Table.Thead> 
  )
}

export default TableHead