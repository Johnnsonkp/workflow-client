import { Button, Grid, SimpleGrid, Text, ThemeIcon, Title, rem } from '@mantine/core';
import { IconCircleDotted, IconFileCode, IconFlame, IconReceiptOff } from '@tabler/icons-react';

// import classes from './FeaturesTitle.module.css';
import classes from './display.module.css'

const features = [
  {
    icon: IconReceiptOff,
    title: "Live Updates",
    description: 'All packages are published under MIT license, you can use Mantine in any project',
    link: "https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL"
  },
  {
    icon: IconFileCode,
    title: "On Duty Guide",
    description: 'Build type safe applications, all components and hooks export types',
    link: "https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL",
  },
  {
    icon: IconCircleDotted,
    title: "Teams",
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
    link: "https://teams.microsoft.com/",
  },
  {
    icon: IconFlame,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Workflows</a>,
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
    link: "https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL",
  },
  {
    icon: IconFlame,
    title: <a href="https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL" target='_blank'>Operations Client</a>,
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
    link: "https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL",
  },
  {
    icon: IconFlame,
    title: "Medirecords",
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
    link: "https://app.medirecords.com/",
  }
];

const links = [
  "https://myemergencydr.sharepoint.com/sites/SupportPortal",
  "https://myemergencydr-my.sharepoint.com/:w:/g/personal/cgallagher_myemergencydr_com_au/ETEtAKkP90RHnuQta46uXGMBr-mBAcNbKKp6cXH9lFKJzg?e=TcldQL",
  "https://flex.twilio.com/",
  "https://app.medirecords.com/",
  "https://teams.microsoft.com/",
  "https://myemergencydr.sharepoint.com/:x:/s/SupportPortal/EREZQd-TRu9LkIx6kGaukbkBGfqC4AeTmOF-dsyTkvqnhw?e=GqC75B",
  "https://myemergencydr.sharepoint.com/sites/SupportPortal/Document%20library/Operations%20Client%20Spreadsheet%20(3).xlsx?web=1",
  "https://myemergencydr.sharepoint.com/:f:/s/OperationsGroup/ErrLnRFxdS5NipBhkUe_CK4Bt2MV4brld926Xkxr2cmKVQ?e=XXTRYv",
  "https://myemergencydr.sharepoint.com/:x:/r/sites/SupportPortal/_layouts/15/Doc.aspx?sourcedoc=%7b57A57C5A-0745-4462-9B2D-DB8A33B2AF70%7d&file=PSO%20Admin%20Guide.xlsx&action=default&mobileredirect=true&web=1"
];

function openLinks() {
  links.forEach(link => window.open(link, '_blank'));
}

export const DisplayContainer = (props) => {
  const items = features.map((feature) => (
    <a key={feature.title} href={feature.link} target="_blank">
      <ThemeIcon
        size={55}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
        className='flex-col'
      >
        <feature.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        <Text mt="0" fw={800} className='!text-[8px] text-center'>
            {feature.title}
        </Text>
      </ThemeIcon>
    </a>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={10}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2} style={{fontSize: "19px"}}>
            {props.title}
          </Title>
          <Text c="dimmed" className='!text-[13px]'>
            Useful links to have open on everyshift
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="sm"
            radius="sm"
            mt="sm"
            mr="xs"
            className='!text-[11px] !p-[7px]'
          >
            Support Portal
          </Button>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="sm"
            radius="sm"
            mt="sm"
            className='!text-[11px] !p-[7px]'
            onClick={() => openLinks()}
          >
            Open All
          </Button>
        </Grid.Col>
        
        {/* <Grid.Col span={{ base: 12, md: 4 }}> */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          {/* <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}> */}
          <SimpleGrid cols={{ base: 1, md: 6 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}