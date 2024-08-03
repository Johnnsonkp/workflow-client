import ArchiveBtnComp from "./ArchiveBtnComp"
import { Table } from "@mantine/core"
import { useAppState } from '../../store/AppState'

function TableHead({setArchieve, showArchive, loadingComponent}) {
  
  return (
    <Table.Thead className={``}>
      <Table.Tr p={'xs'} className="text-[13px] h-11 " fw={600}>
          <Table.Th fw={500} className="!w-[1%]">
            {/* {!loadingComponent && state.tasks?.length && "Complete" } */}
            Complete
          </Table.Th>
          <Table.Th fw={500} className="w-[35%]">
            {/* {!loadingComponent && state.tasks?.length &&  "Name"} */}
            Name
          </Table.Th>
          <Table.Th fw={500} className="w-[%]">
            {/* {!loadingComponent && state.tasks?.length && "Status"} */}
            Status
          </Table.Th>
          <Table.Th fw={500} className="">
            {/* {!loadingComponent && state.tasks?.length && "Task Date"} */}
            Task Date
          </Table.Th>
          <Table.Th fw={500} className="">
            {/* {!loadingComponent && state.tasks?.length && "Start - Finish"} */}
            Start - Finish
          </Table.Th>
          <Table.Th fw={500} className="">
            {/* {!loadingComponent && state.tasks?.length && "Project" } */}
            Project
          </Table.Th>
          <Table.Th className="border-l border-l-[#F4F4F4] w-5">{
          // !loadingComponent && state.tasks?.length && 
            <ArchiveBtnComp showArchive={showArchive} setArchieve={setArchieve}/>}
          </Table.Th>
      </Table.Tr>
    </Table.Thead> 
  )
}

export default TableHead