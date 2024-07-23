import { Accordion, Container, Title } from '@mantine/core';

import classes from './monthly.module.css';
import { useAppState } from '../../store/AppState';

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

export const MonthlyGoal = () => {
    const {state} = useAppState()

  return (

        
        <Container size="sm" className={classes.wrapper}>
            <Title ta="center" className={classes.title}>
            Monthly Targets
            </Title>
            <Accordion variant="separated">
            {
                state.monthly && state.monthly.map((month) => (
                    <Accordion.Item className={classes.item} value="reset-password">
                        <Accordion.Control>{month.title}</Accordion.Control>
                        <Accordion.Panel>{placeholder}</Accordion.Panel>
                    </Accordion.Item>
                ))
            }
            </Accordion>
      </Container>
    )
};
