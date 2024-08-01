import { Badge, Button, Card, Center, Group, Image, Text } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';

import classes from './FeaturesCard.module.css';
import { useAppState } from '../../../store/AppState';
import {useNavigate} from 'react-router-dom'
import { userSignOut } from '../../../actions/userActions';

const handleSignOut = () => {
    alert("Signing out now, goodbye")
    userSignOut('AUTH')
    window.location.reload()
}

export function UserCardInfo({state, user, navigate}) {

  return (
    <Card withBorder radius="md" className={classes.card}>
        <Image 
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" 
          alt="User display picture" 
        />

      <Group justify="space-between" mt="xs">
        <div>
          <Text fw={500}>{user?.username || " "}</Text>
          <Text fz="xs" c="dimmed">
            {user.email || " "}
          </Text>
        </div>
        {/* <Badge variant="outline">25% off</Badge> */}
      </Group>

        <Group gap={4} mt="xs">
          <div>
            <Button bg={'red'} onClick={ () => handleSignOut()} radius="sm" style={{ flex: 1 }} size='xs'>
                Signout
            </Button>
          </div>

          <Button onClick={() => navigate("/dashboard")} radius="sm" style={{ flex: 1 }} size='xs'>
            Dashboard
          </Button>
        </Group>
    </Card>
  );
}