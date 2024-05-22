import { Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Skeleton } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';

import StandUpCardCustom from '../cards/standUpCards/StandUp';
import StatsRingCard from '../cards/taskStats/TaskCardStatsCard';
import { TablerIconsProps } from '@tabler/icons-react';
import TimeLineCardDIsplay from '../timelineCard/TimeLine.jsx'

interface Task {
    title: string;
    description: string;
    time_to_start: string;
    status: string;
    time_to_complete: string;
    order: number;
}

interface Props {
  taskObj: Task[] | undefined
}

interface Data {
  label: string, 
  stats: number | any;
  progress: number; 
  color: string; 
  icon: string;
}

interface Icons {
  [key: string]: (props: TablerIconsProps) => JSX.Element
}

const ProgressCardCustom: React.FC<Props> = ({taskObj}) => {
  const icons: Icons = {
    up: IconArrowUpRight ,
    down: IconArrowDownRight,
  };

  let counter = []
  let inProgress = []
  let overdue = []

  const TaskCount = taskObj?.length || 0   

  taskObj?.forEach((task: Task) => {
    if(task.status === 'complete'){
      counter.push(task)
    }  
    if(task.status === 'inprogress'){
      inProgress.push(task)
    } 
    if(task.status === 'overdue'){
      overdue.push(task)
    } 
  })
  
  let completedTaskCount: number = counter.length
  let taskCreatedVsTaskCompleted = completedTaskCount + '/' + TaskCount
  let completionPercentage: number = completedTaskCount / TaskCount * 100
  completionPercentage = Math.ceil(completionPercentage)

  
  const data: Data[] = [
    { label: 'Completion Rate', stats: taskCreatedVsTaskCompleted, progress: completionPercentage, color: 'teal', icon: 'up' }
  ] 

  const stats = data.map((stat) => {
    return (
      <Paper withBorder radius="md" p="sm" key={stat.label} className='!shadow-md !h-[100%] !border !bg-[#F9FAFA]'>
        <Group className='!justify-center !align-end'>
          <div>
              <Text fz="lg" className={''} fw={500}>
                Project tasks
              </Text>
              <Group mt="xl" mb='sm'>
                <div className=''>
                  <Text className={'!font-bold'} mt={0}>
                    {completedTaskCount}
                  </Text>
                  <Text fz="xs" c="dimmed" className=''>
                    Completed
                  </Text>
                </div>
                <div className=''>
                  <Text className={'!font-bold'} mt={0}>
                    {TaskCount}
                  </Text>
                  <Text fz="xs" c="dimmed" className=''>
                    Remaining
                  </Text>
                </div>
              </Group>

              <Group mt="sm" mb='sm'>
                <div className=''>
                  <Text className={'!font-bold'}>
                    {inProgress.length}
                  </Text>
                  <Text size="xs" c="dimmed" className=''>
                    In progress
                  </Text>
                </div>

                <div className=''>
                  <Text className={'!font-bold'}>
                    {overdue.length}
                  </Text>
                  <Text size="xs" c="dimmed" className={''}>
                    Overdue
                  </Text>
                </div>
              </Group>
          </div>
          <RingProgress
            size={150}
            roundCaps
            thickness={10}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <div>
                  <Text ta="center" fz="lg" className={'!font-bold'}>
                    {completionPercentage}%
                  </Text>
                  <Text ta="center" fz="md" c="dimmed">
                    Completed
                  </Text>
                </div>
              </Center>
            }
          />
        </Group>
      </Paper>
    );
  });

  return <div>{stats}</div>
}



const DashboardBannerCards: React.FC<Props> = ({taskObj}) => {
    const child = <Skeleton height={200} radius="md" animate={true} />;
      return (
          <Container 
            className=''
            fluid={true}
            my="xl" 
            px="xs"
          >
            <Grid className=''>
              <Grid.Col span={{ base: 12, lg: 4 }} className=''>{<StandUpCardCustom /> || child}</Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }} className=''>{<ProgressCardCustom taskObj={taskObj}/> || child}</Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }} className=''>{<TimeLineCardDIsplay /> || child}</Grid.Col>
            </Grid>
          </Container> 
      );
  }

export default DashboardBannerCards