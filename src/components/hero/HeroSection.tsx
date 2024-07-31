import { Container, Text, Title } from '@mantine/core'

import { ReactRailsFeatures } from '../featuresDisplay/ReactRailsFeacture'
import classes from './hero.module.css'

function HeroSection() {
  return (
    <Container className={classes.container} size="md">
      <Title 
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
      </Title>
      <Text className={classes.description} size="xl" mt="xl">
        Workflows allows you to make progress on the things that matter the most. Prioritize quality in everything you do and reclaim your valuable time back.
      </Text>

      <ReactRailsFeatures />
    </Container>
  )
}

export default HeroSection