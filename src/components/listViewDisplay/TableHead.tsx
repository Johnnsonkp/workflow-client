import { Table } from "@mantine/core"

function TableHead({setArchieve, showArchive, loadingComponent}) {
  
  return (
    <>
    <Table.Thead className={``}>
        {/* {loadingComponent? "" :  */}
        <Table.Tr p={'xs'} className="text-[13px]" fw={600}>
            <Table.Th fw={500}>Complete</Table.Th>
            <Table.Th fw={500}>Name</Table.Th>
            <Table.Th fw={500}>Status</Table.Th>
            <Table.Th fw={500}>Task Date</Table.Th>
            <Table.Th fw={500}>Start - Finish</Table.Th>
            <Table.Th fw={500}>Project</Table.Th>
            <Table.Th>
            <button 
                className='!m-[0px] border border-#1C7ED6-500 rounded-[4px] py-[0.4rem] px-3 text-[#333] font-medium text-[11px] bg-[#F1F3F5]' 
                onClick={() => setArchieve((prevState) => prevState === null? "archive" : null)}>
                {showArchive? 'Hide' : 'Show'} Archive
            </button>
            </Table.Th>
        </Table.Tr>
         {/* } */}
    </Table.Thead>
    </>
  )
}

export default TableHead