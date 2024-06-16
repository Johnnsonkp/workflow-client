import { Avatar, Stack, Text, ThemeIcon, rem } from '@mantine/core';
import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';

import classes from './ContactIcons.module.css';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <ThemeIcon size={23} radius="md" className={classes.icon}>
        <Icon style={{ width: rem(12), height: rem(12) }} />
      </ThemeIcon>

      <div>
        <Text size="xs" className={classes.title}>
        {title}
        </Text>
        <Text size="xs" className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'john.nkp1@gmail.com', icon: IconAt },
  { title: 'Phone', description: '+61 401 823 031', icon: IconPhone },
  { title: 'Address', description: 'Melbourne, Vic, Australia', icon: IconMapPin },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack fz={'sm'}>{items}</Stack>;
}