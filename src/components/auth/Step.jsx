import React from 'react'

function Step({num}) {
  return (
    // <div class="relative z-10 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-medium ">
    <div 
      class="bg-[#251E4C] relative z-10 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white font-medium 
      shadow-[0_0_10px_rgba(124,114,255,0.7),_0_0_40px_rgba(124,114,255,0.5),_0_0_60px_rgba(124,114,255,0.3)]"
    >
      {num}
    </div>
  )
}

export default Step


