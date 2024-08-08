import { SegmentedControl } from '@mantine/core';

function ArchiveBtnComp({showArchive, setArchieve}) {
  return (
    <SegmentedControl
      size="xs"
      className='text-xs'
      fullWidth={false}
      value={showArchive? 'Show' : 'Hide'}
      onChange={() => setArchieve((prevState) => prevState === null? "archive" : null)}
      transitionTimingFunction="ease"
      data={[
          { label: 'Hide Archive', value: 'Hide' },
          { label: 'Show Archive', value: 'Show' },
      ]}
    />
  )
}

export default ArchiveBtnComp