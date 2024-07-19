import { Box, Button, Group, LoadingOverlay, Skeleton, Text, rem, useMantineTheme } from '@mantine/core';
import { Container, Grid, SimpleGrid, Table } from '@mantine/core';
import { IconCloudUpload, IconDownload, IconHourglassEmpty, IconX } from '@tabler/icons-react';
import react, {useEffect, useState} from 'react'

import classes from './emptyTaskModal.module.css'
import { useAppState } from '../../store/AppState';
import { useDisclosure } from '@mantine/hooks';

export function EmptyTaskModal() {
  const [loading, setLoading] = useState(true)
  const [comp, setComp] = useState()
  const {state} = useAppState()

  const EmptyComp = () => (
    <Grid className={classes.wrapper}>
      <Container my="xl">
        <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md" className='' >
          <Group justify="center">
            <IconHourglassEmpty style={{ width: rem(40), height: rem(40), textAlign: 'center' }} stroke={1.5} color='#555'/>
          </Group>
          <Group justify="center">
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              No Tasks in your Tasklist, hit the "+" button to create a new Task.
            </Text>
          </Group>
        </SimpleGrid>
      </Container>
    </Grid>
  )

  useEffect(() => {
    setTimeout(() => {
      console.log("state.tasks", state.tasks)
      if(loading === true && state?.tasks?.length < 1 || loading === true && state?.tasks?.length == null){
        setLoading(false)
      }
    }, 200)
  }, [loading])

  return loading? <LoadingOverlay color='darkgray' zIndex={'0'} visible={true} overlayProps={{ radius: "sm", blur: 2 }} />  : <EmptyComp />;
}