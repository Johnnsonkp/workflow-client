import { Button, Group, Skeleton, Text, rem, useMantineTheme } from '@mantine/core';
import { Container, Grid, SimpleGrid, Table } from '@mantine/core';
import { IconCloudUpload, IconDownload, IconHourglassEmpty, IconX } from '@tabler/icons-react';

import classes from './emptyTaskModal.module.css'

export function EmptyTaskModal() {
  return (
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
  );
}