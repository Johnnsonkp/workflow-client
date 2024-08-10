import ArchiveBtnComp from "./ArchiveBtnComp"
import { Table } from "@mantine/core"
import { useAppState } from '../../store/AppState'

function TableHead({setArchieve, showArchive}) {
  
  return (
    <Table.Thead className={``}>
      <Table.Tr p={'xs'} className="text-[13px] h-11 " fw={600}>
          <Table.Th fw={500} className="!w-[1%]">
            Complete
          </Table.Th>
          <Table.Th fw={500} className="w-[35%]">
            Name
          </Table.Th>
          <Table.Th fw={500} className="w-[%]">
            Status
          </Table.Th>
          <Table.Th fw={500} className="">
            Task Date
          </Table.Th>
          <Table.Th fw={500} className="">
            Start - Finish
          </Table.Th>
          <Table.Th fw={500} className="">
            Project
          </Table.Th>
          <Table.Th className="border-l border-l-[#F4F4F4] w-5">{
            <ArchiveBtnComp showArchive={showArchive} setArchieve={setArchieve}/>}
          </Table.Th>
      </Table.Tr>
    </Table.Thead> 
  )
}

export default TableHead