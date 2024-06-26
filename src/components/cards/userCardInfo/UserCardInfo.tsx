import { Badge, Button, Card, Center, Group, Image, Text } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';

import classes from './FeaturesCard.module.css';
import { useAppState } from '../../../store/AppState';
import {useNavigate} from 'react-router-dom'
import { userSignOut } from '../../../actions/userActions';

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

const handleSignOut = () => {
    alert("Signing out now, goodbye")
    userSignOut('AUTH')
    window.location.reload()
    // dispatch({type: "LOGGED_OUT"})
}

export function UserCardInfo({state, user, navigate}) {
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));


  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" alt="User deisplay picture" />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{user?.username || " "}</Text>
          <Text fz="xs" c="dimmed">
            {user.email || " "}
          </Text>
        </div>
        {/* <Badge variant="outline">25% off</Badge> */}
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={4}>
          <div>
            <Button bg={'red'} onClick={ () => handleSignOut()} radius="sm" style={{ flex: 1 }}>
                Signout
            </Button>
          </div>

          <Button onClick={() => navigate("/personal")} radius="sm" style={{ flex: 1 }}>
            Back to work
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}