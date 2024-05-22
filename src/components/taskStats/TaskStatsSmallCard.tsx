import { Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Skeleton } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';

import { TablerIconsProps } from '@tabler/icons-react';

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


const TaskStatsSmallCard: React.FC<Props> = ({taskObj}) => {
    const child = <Skeleton height={200} radius="md" animate={true} />;
    const icons: Icons = {
      up: IconArrowUpRight ,
      down: IconArrowDownRight,
    };

    let counter = []

    const TaskCount = taskObj?.length || 0   

    taskObj?.forEach((task) => {
      if(task.status === 'complete'){
        counter.push(task)
      }  
    })
    let completedTaskCount = counter.length
    let taskCreatedVsTaskCompleted = completedTaskCount + '/' + TaskCount
    let completionPercentage = completedTaskCount / TaskCount * 100
    completionPercentage = Math.ceil(completionPercentage)

    
    const data: Data[] = [
      { label: 'Completion Rate', stats: taskCreatedVsTaskCompleted, progress: completionPercentage, color: 'teal', icon: 'up' }
    ] 

    const stats = data.map((stat) => {

      const Icon = icons[stat.icon];

      return (
        <Paper withBorder radius="md" p="xs" key={stat.label} className='h-[200px]'>
          <Group>
            <RingProgress
              size={160}
              roundCaps
              thickness={10}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  {/* <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} /> */}
                  <Text c="dimmed" size="lg" tt="uppercase" fw={700}>{completionPercentage}%</Text>
                </Center>
              }
            />
            <div>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                {stat.label}
              </Text>
              <Text fw={700} size="xl">
                {stat.stats}
              </Text>
            </div>
          </Group>
        </Paper>
      );
    });

    

      return ({stats});
  }

export default TaskStatsSmallCard