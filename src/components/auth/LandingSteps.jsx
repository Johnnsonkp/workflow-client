import { IconHandThreeFingers, IconLuggage, IconSparkles } from '@tabler/icons-react';

import React from 'react'
import Step from './Step'
import StepTrail from './StepTrail'

function LandingSteps({step_1, step_2, step_3}) {
  return (
    <div className='mt-11'>
      <div class="relative flex pb-6">
        <StepTrail />
        <Step num={<IconHandThreeFingers size={'22px'} />}/>
        <div class="flex-grow ml-2 pl-4 px-5 py-2 border border-gray-500 rounded-md bg-black bg-opacity-[0.2]">
          <h2 class="title-font mb-1 text-sm font-semibold tracking-wider text-white-900">{step_1}</h2>
          <p class="mt-2 border-l-4 border-dotted px-4 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit Cumque quidem id in</p>
        </div>
      </div> 

        <div class="relative flex pb-6 ">
          <StepTrail />
          <Step num={<IconLuggage size={'22px'} />}/>

          <div class="flex-grow ml-2 pl-4 px-5 py-2 border border-gray-500 rounded-md bg-black bg-opacity-[0.2]">
            <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-white-900">{step_2}</h2>
            <p class="mt-2 border-l-4 border-dotted px-4 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit Cumque quidem id in</p>
          </div>
        </div>

        <div class="relative flex pb-7">
          <Step num={<IconSparkles size={'22px'} />}/>
          <div class="flex-grow ml-2 pl-4 px-5 py-2 border border-gray-500 rounded-md bg-black bg-opacity-[0.2]">
            <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-white-900">{step_3}</h2>
            <p class="mt-2 border-l-4 border-dotted px-4 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit Cumque quidem id in</p>
          </div>
        </div>
    </div>
  )
}

export default LandingSteps