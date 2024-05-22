import React from 'react'
import { Text } from '@mantine/core'
import classes from './hero.module.css'

function HeroSection() {
  return (
    <div className={`${classes.title} !flex`}>
        {' '}
        <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit className='!flex-col !text-6xl'>
            <h1>1. Do Fewer Things</h1>
            <h1>2. Work at a natural pace</h1>
            <h1>3. Obsess over quality</h1>
        </Text>{' '}

    </div>
  )
}

export default HeroSection