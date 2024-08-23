import { Box, Button, Group, LoadingOverlay, Skeleton, Text, rem, useMantineTheme } from '@mantine/core';
import { Container, Grid, SimpleGrid, Table } from '@mantine/core';
import { IconCloudUpload, IconDownload, IconHourglassEmpty, IconX } from '@tabler/icons-react';
import react, {useEffect, useState} from 'react'

import TaskListLoadSkeleton from '../listViewDisplay/TaskListLoadSkeleton';
import classes from './emptyTaskModal.module.css'
import { useAppState } from '../../store/AppState';
import { useDisclosure } from '@mantine/hooks';

export function EmptyTaskModal() {
  const [loading, setLoading] = useState(true)
  const [comp, setComp] = useState()
  const {state} = useAppState()
  // console.log("EmptyTaskModal loading...", Date.now())


  const EmptyComp = () => (
    <Grid className={classes.wrapper}>
      {/* {loading ? 
        <TaskListLoadSkeleton /> : */}
        <Container my="xl">
          <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md" className='' >
                <>
                <Group justify="center">
                  <IconHourglassEmpty style={{ width: rem(60), height: rem(60), textAlign: 'center' }} 
                  stroke={1.5} color='#999'/>
                </Group>
                <Group justify="center">
                  <div>
                    <Text ta="center" fz="sm" mt="xs">
                      Press the "+" button to create a new task
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                      No tasks in your tasklist.
                    </Text>
                  </div>
                </Group>
                </>
          </SimpleGrid>
        </Container>
      {/* } */}
    </Grid>
  )
  return <EmptyComp />;
}