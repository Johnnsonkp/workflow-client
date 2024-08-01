function ArchiveBtnComp({showArchive}) {
  return (
    <button className='!m-[0px] border border-#1C7ED6-500 rounded-[4px] 
        py-[0.4rem] px-3 text-[#333] font-medium text-[11px] bg-[#F1F3F5]' 
        onClick={() => setArchieve((prevState) => prevState === null? "archive" : null)}>
        {showArchive? 'Hide' : 'Show'} Archive
    </button>
  )
}

export default ArchiveBtnComp