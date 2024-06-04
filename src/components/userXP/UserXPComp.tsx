import { Container, SimpleGrid, Text, ThemeIcon, Title, rem } from '@mantine/core';
import { IconCookie, IconGauge, IconLock, IconMessage2, IconUser } from '@tabler/icons-react';

import classes from './userXPComp.module.css';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Gamify Your Productivity',
    description:
      'Turn work into a game by completing tasks and projects to earn XP points and unlock achievements.',
  },
  {
    icon: IconUser,
    title: 'Set and Achieve Milestones',
    description:
      'Establish goals and work toward achieving significant milestones.',
  },
  {
    icon: IconCookie,
    title: 'Track Your Progress',
    description:
      'Track your progress effortless, and make adjustments on the fly.',
  }
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function UserXPComp() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>User Experience dashboard Coming Soon...</Title>

      <Container size={560} p={0}>
        <Text size="md" className={classes.description}>
          Gamify your productivity by completing tasks and projects to earn XP points which contribute to leveling up and unlocking achievements.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}