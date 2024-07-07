import { Table } from "@mantine/core"

function TableHead({setArchieve, showArchive, loadingComponent}) {
  return (
    <>
    <Table.Thead className="">
        {loadingComponent? "" : <Table.Tr p={'xs'} className="text-[12px]" fw={600}>
            <Table.Th>Complete</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Task Date</Table.Th>
            <Table.Th>Start Time - Finsh Time</Table.Th>
            <Table.Th>Project</Table.Th>
            <Table.Th>
            <button 
                className='!m-[0px] shadow-sm border border-#1C7ED6-500 rounded-[4px] py-[0.4rem] px-3 text-[#333] font-medium text-[11px] bg-[#F1F3F5]' 
                onClick={() => setArchieve((prevState) => prevState === null? "archive" : null)}>
                {showArchive? 'Hide' : 'Show'} Archive
            </button>
            </Table.Th>
        </Table.Tr>}
    </Table.Thead>
    </>
  )
}

export default TableHead