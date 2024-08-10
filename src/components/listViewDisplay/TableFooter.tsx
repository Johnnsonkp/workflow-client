import { Pagination } from "@mantine/core"

function TableFooter({paginationCount, activePage, setPage}) {
  return (
    <>
        <Pagination 
          total={paginationCount} 
          value={activePage} 
          onChange={setPage} 
          mt="md" 
          ml={'sm'}
          size="xs" 
          color="#228a"
        />
    </>
  )
}

export default TableFooter