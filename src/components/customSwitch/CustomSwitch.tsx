import { Group, Switch } from '@mantine/core';

import classes from './CustomSwitch.module.css';

export function CustomSwitch({onChange, className, onClick, checked}) {
  return (
    <Group justify="center" p="xs" className={className}>
      <Switch className={className} onChange={onChange} onClick={() => onClick()} checked={checked}/>
    </Group>
  );
}