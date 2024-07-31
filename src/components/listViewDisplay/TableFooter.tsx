import { Pagination, Table } from "@mantine/core"

function TableFooter({loadingComponent, paginationCount, activePage, setPage}) {
  return (
    // <Table className='px-3'>
        <>
          {/* {!loadingComponent && */}
            <Pagination 
              total={paginationCount} 
              value={activePage} 
              onChange={setPage} 
              mt="md" 
              ml={'sm'}
              size="xs" 
              color="#228a"
            />
          {/* } */}
          </>
    // </Table>
  )
}

export default TableFooter