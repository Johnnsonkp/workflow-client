import { Container, Text, Title } from '@mantine/core'

import { ReactRailsFeatures } from '../featuresDisplay/ReactRailsFeacture'
import classes from './hero.module.css'

function HeroSection() {
  return (
    <Container className={classes.container} size="md">
      {/* <Title 
          fw={600} 
          className={`${classes.title} flex`}
        >
            / Do fewer things{' '}
      </Title>
      <Title 
        fw={600} 
        className={`${classes.title} flex`}
      >
            / Work at a natural pace
      </Title>
      <Title 
          fw={600} 
          className={`${classes.title} flex`}
        >
            / Obsess over quality
      </Title> */}

      <Title fw={600} className={`${classes.title} flex`}>
        Prioritize quality, reclaim your time. Let workflows streamline your projects.
      </Title>

      {/* <Text className={classes.description} size="xl" mt="xl">
        Workflows allows you to make progress on the things that matter the most. Prioritize quality in everything you do and reclaim your valuable time back.
      </Text> */}
      <Text className={classes.description} size="xl" mt="xl">
        <span className='border border-[#666EEF] bg-[#666EEF] py-[2px] px-2.5 rounded-[20px] mr-2 text-[#fff] text-md font-normal'>1</span> Do fewer things{' '}
      </Text>
      <Text className={classes.description} size="xl" mt="sm">
        <span className='border border-[#666EEF] bg-[#666EEF] py-[2px] px-2.5 rounded-[20px] mr-2 text-[#fff] text-md font-normal'>2</span> Work at a natural pace{' '}
      </Text>
      <Text className={classes.description} size="xl" mt="sm">
        <span className='border border-[#666EEF] bg-[#666EEF] py-[2px] px-2.5 rounded-[20px] mr-2 text-[#fff] text-md font-normal'>3</span> Obsess over quality{' '}
      </Text>

      <ReactRailsFeatures />
    </Container>
  )
}

export default HeroSection