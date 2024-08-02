import { Burger, Container, Group, SegmentedControl } from '@mantine/core';

function ArchiveBtnComp({showArchive, setArchieve}) {
  return (
    // <button className='!m-[0px] border border-#1C7ED6-500 rounded-[4px] 
    //     py-[0.4rem] px-3 text-[#333] font-medium text-[11px] bg-[#F1F3F5]' 
    //     onClick={() => setArchieve((prevState) => prevState === null? "archive" : null)}>
    //     {showArchive? 'Hide' : 'Show'} Archive
    // </button>

        <SegmentedControl
          size="xs"
          value={showArchive? 'Show' : 'Hide'}
          onChange={(value) => setArchieve((prevState) => prevState === null? "archive" : null)}
          transitionTimingFunction="ease"
          data={[
              { label: 'Hide Archive', value: 'Hide' },
              { label: 'Show Archive', value: 'Show' },
          ]}
        />
  )
}

export default ArchiveBtnComp