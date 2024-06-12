import { Container, Text, Title } from '@mantine/core'

import classes from './Hero.module.css'

function HeroSection() {
  return (
    <Container className={classes.container} size="md">
      <Title 
          variant="gradient"
          fw={600} 
          gradient={{ from: 'black', to: 'gray' }} inherit 
          className={`${classes.title} flex`}
        >
            / Do fewer things{' '}
      </Title>
      <Title 
          variant="gradient"
          fw={600} 
          gradient={{ from: 'black', to: 'gray' }} inherit 
          className={`${classes.title} flex`}
        >
            / Work at a natural pace
      </Title>
      <Title 
          variant="gradient"
          fw={600} 
          gradient={{ from: 'black', to: 'gray' }} inherit 
          className={`${classes.title} flex`}
        >
            / Obsess over quality
      </Title>
      <Text className={classes.description} size="xl" mt="xl">
        Workflows allows you to make progress on the things that matter the most. Prioritize quality in everything you do and reclaim your valuable time back.
      </Text>

    </Container>
  )
}

export default HeroSection