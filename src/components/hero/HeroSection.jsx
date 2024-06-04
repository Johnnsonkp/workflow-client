import React from 'react'
import { Text } from '@mantine/core'
import classes from './hero.module.css'

function HeroSection() {
  return (
    <div className={`${classes.title} !flex justify-start`}>
        <Text component="span" variant="gradient"
          fw={600} 
          gradient={{ from: 'black', to: 'gray' }} inherit 
          className='!flex-col !text-6xl '
        >
            <h1>/ Do fewer things</h1>{' '}
            <h1>/ Work at a natural pace</h1>
            <h1>/ Obsess over quality</h1>
        </Text>

    </div>

    
  )
}

export default HeroSection