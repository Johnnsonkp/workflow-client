import { Group, Switch } from '@mantine/core';

import classes from './CustomSwitch.module.css';

export function CustomSwitch({onChange, className}) {
  return (
    <Group justify="center" p="xs" className={className}>
      <Switch classNames={classes} onChange={onChange}/>
    </Group>
  );
}