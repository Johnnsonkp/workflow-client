import { Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Skeleton } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';

import React from 'react'

function StandUpCard() {
  return (
    <Paper withBorder radius="md" p="sm" className=''>
          <Group className='!justify-center !align-end'>
          <div>
                <Text fz="xl" className={'!font-bold'}>
                  Project tasks
                </Text>
            </div>
          </Group>
    </Paper>
  )
}

export default StandUpCard