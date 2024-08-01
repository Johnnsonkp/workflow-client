import { Card, Group, RingProgress, Text, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

import classes from './StatsRingCard.module.css';
import { useAppState } from '../../../store/AppState';

interface Task {
  title: string;
  description: string;
  time_to_start: string;
  status: string;
  time_to_complete: string;
  order: number;
  project?: string;
}

function StatsRingCard({}) {
  const {state, dispatch} = useAppState()
  const [taskObj, setTaskObj] = useState<Task[]>()

  useEffect(() => {
    if(state.tasks && taskObj === undefined ){
      setTaskObj(state.tasks.filter((task) => task.number === null ) || state.tasks)
    }
  }, [])

  let counter = []
  let inProgress = []
  let overdue = []

  const TaskCount = taskObj?.length || 0   

  taskObj?.length && taskObj?.forEach((task) => {
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
  
  let completedTaskCount: number = counter.length || 0
  let taskCreatedVsTaskCompleted = completedTaskCount + '/' + TaskCount
  let completionPercentage: number = completedTaskCount / TaskCount * 100
  completionPercentage = Math.ceil(completionPercentage)
  

  const data = [
    { label: 'Completion Rate', stats: taskCreatedVsTaskCompleted, progress: completionPercentage, color: 'teal', icon: 'up' }
  ]

  const stats = [
    { value: TaskCount, label: 'Total tasks' },
    { value: inProgress.length, label: 'In progress' },
  ];

  const ringStatusColor = (completePercentage) => {    
    if(completePercentage <= 30){
      return 'red'
    }
    if(completePercentage > 30 && completePercentage <= 60){
      return 'orange'
    }
    if(completePercentage > 60){
      return 'green'
    }

  }

  
  const theme = useMantineTheme();
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.lead}>{stat.value}</Text>
      <Text size="sm" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="lg" radius="md" className={`${classes.card} !border !bg-[#F9FAFA]`}>
      <div className={classes.inner}>
        <div>
          <Group className='flex justify-between'>
            <div>
              <Text className={classes.lead} mt={30}>
                {completedTaskCount}
              </Text>
              <Text fz="sm" c="dimmed">
                Completed
              </Text>
            </div>

            <div>
              <Text className={classes.lead} mt={30}>
                {overdue.length}
              </Text>
              <Text fz="sm" c="dimmed">
                Overdue
              </Text>
            </div>
          </Group>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={10}
            size={140}
            // sections={[{ value: (completedTaskCount / TaskCount) * 100, color: theme.primaryColor }]}
            sections={[{ value: (completedTaskCount / TaskCount) * 100, color: ringStatusColor((completedTaskCount / TaskCount) * 100) }]}
            label={
              <div>
                <Text ta="center" fz="md" className={classes.label}>
                  {((completedTaskCount / TaskCount || 0) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="sm" c="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

export default StatsRingCard