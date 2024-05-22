import { Card, Group, Switch, Text } from '@mantine/core';
import React, {useState} from 'react'

import classes from './standUp.module.css'

const data = [
  { title: 'Workflow client build', description: 'Direct messages you have received from other users' },
  { title: 'Shopify dev study', description: 'Code review requests from your team members' },
  { title: 'Catch up on all bills and payments', description: 'Daily digest with comments on your posts' },
];

const StandUpCardCustom = () => {
  const [toggle, setToggle] = useState(false)
  const [toggleText, setToggleText] = useState(false)
  
  const items = data.map((item, index) => (
    <Group justify="space-between" className={classes.item} wrap="nowrap" gap="sm" key={item.title}>
      {/* <div>
        <Text size="sm" className={`${toggleText? '!line-through' : ''}`}>{index + 1}. {item.title}</Text>
      </div> */}

      <div>
        <Text size="sm" className={`${toggleText? '!line-through' : ''}`}>{index + 1}. {item.title}</Text>
        {/* <Text size="xs" c="dimmed">
          {item.description}
        </Text> */}
      </div>
      <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="sm" onClick={() => setToggleText(!toggleText)}/>
    </Group>
  ));

  const StandUpText = () => {
    return <p className='bg-yellow-500 text-white px-2'>Stand up</p>
  }
  const StandDownText = () => {
    return <p className='bg-purple-500 text-white px-2'>Stand down</p>
  }

  return (
    <Card withBorder radius="md" p="xs" className={`${classes.card} !shadow-md !border !bg-[#F9FAFA]`} pb="">
      <Text fz="lg"  fw={500} mb="md" className='flex justify-between align-middle'>
        {toggle? <StandDownText /> : <StandUpText />   }
        <Switch onLabel="Stand Up" offLabel="Stand Down" className={classes.switch} size="sm" onClick={() => setToggle(!toggle)}/>
      </Text>
      {items}
    </Card>
  );
}

export default StandUpCardCustom
