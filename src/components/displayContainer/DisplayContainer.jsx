import { Button, Grid, SimpleGrid, Text, ThemeIcon, Title, rem } from '@mantine/core';
import { IconCircleDotted, IconFileCode, IconFlame, IconReceiptOff } from '@tabler/icons-react';

// import classes from './FeaturesTitle.module.css';
import classes from './display.module.css'

const features = [
  {
    icon: IconReceiptOff,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Live Updates</a>,
    description: 'All packages are published under MIT license, you can use Mantine in any project',
  },
  {
    icon: IconFileCode,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>On Duty Guide</a>,
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: IconCircleDotted,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Teams</a>,
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: IconFlame,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Workflows</a>,
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
  {
    icon: IconFlame,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Operations Client</a>,
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
  {
    icon: IconFlame,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Operations Client</a>,
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  }
];

export const DisplayContainer = (props) => {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={70}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
        className='flex-col'
      >
        <feature.icon style={{ width: rem(29), height: rem(29) }} stroke={1.5} />
        {/* <Text fz="sm" mt="sm" fw={500} className='text-1xl'> */}
        <Text mt="0" fw={800} className='!text-[10px] text-center'>
            {feature.title}
        </Text>
      </ThemeIcon>
      {/* <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text> */}
      {/* <Text c="dimmed" fz="sm">
        {feature.description}
      </Text> */}
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={10}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            {props.title}
          </Title>
          {/* <Text c="dimmed">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text> */}

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Support Portal
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}