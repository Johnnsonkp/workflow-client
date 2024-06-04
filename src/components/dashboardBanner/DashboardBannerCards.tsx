import { Avatar, Button, Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Skeleton } from '@mantine/core';
import { IconArrowAutofitLeft, IconArrowBadgeLeft, IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import React, {useEffect, useState} from 'react';

import StandUpCardCustom from '../cards/standUpCards/StandUp';
import StatsRingCard from '../cards/taskStats/TaskCardStatsCard';
import { TablerIconsProps } from '@tabler/icons-react';
import TimeLineCardDIsplay from '../timelineCard/TimeLine.jsx'
import { UserInfoAction } from '../auth/UserCard';
import classes from './dashboard.module.css'

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

const CardContainerCx = ({children, title}) => {
  const child = <Skeleton height={200} radius="md" animate={true} />;
  const [loadingComponent, setLoadingComponent]: any = useState(true)

  useEffect(() => {
    let loadingDelay = setTimeout(() => {
      if(children){
        setLoadingComponent(false)
      }
   }, 800)

   return () => clearTimeout(loadingDelay);
  }, [])


  return (
    loadingComponent? child : <div className={`${classes.cardContainer}`}>
        <div className={`${classes.innerCard}`}>
          <Group mt="0" mb='0' px={'10'}>
            <Text fz="sm" fw={500}>{title}</Text>
          </Group>
        </div>
        {children}
    </div>
  )
}

const DashboardCardComp = ({title, Comp, className}) => (
   <Grid.Col span={{ base: 12, lg: 4 }} className={className}>
    {<CardContainerCx title={title} children={<Comp />} />} 
  </Grid.Col>
)


const data = [
  {
    title: 'UserXP',
    component: UserInfoAction,
  },
  {
    title: 'Stand up',
    component: StandUpCardCustom,
  },
  {
    title: 'Stats',
    component: StatsRingCard,
  },
  {
    title: 'Monthly',
    component: TimeLineCardDIsplay
  },
]

const CustomCarousel = ({position, setPosition, nextPosition, lastPosition, animationClass, rightAnimation, lastHiddenPosition}) => (
  // <div className='flex'>
  <>
    {/* <p>lastHiddenPosition: {lastHiddenPosition}</p> */}
    <DashboardCardComp className={``} title={data[position].title} Comp={data[position].component} />
    <DashboardCardComp className={`${classes.defaultCarousel}`}   title={data[nextPosition].title} Comp={data[nextPosition].component} />
    <DashboardCardComp className={`${classes.defaultCarousel}`}  title={data[lastPosition].title} Comp={data[lastPosition].component} />
    {/* <DashboardCardComp className={``} title={data[lastHiddenPosition]?.title} Comp={data[lastHiddenPosition].component}/> */}
  </>
)


const DashboardBannerCards: React.FC<Props> = ({taskObj}) => {
  const [position, setPosition]: any = useState(0)
  const [nextPosition, setNextPosition]: any = useState(position + 1)
  const [lastPosition, setLastPosition]: any = useState(position + 2)
  const [lastHiddenPosition, setLastHiddenPosition]: any = useState(position + 3)
  const [toggle, setToggle] = useState(false)


  const [animationClass, setAnimationClass]: any = useState(false)
  const [rightAnimation, setRightAnimation]: any = useState(false)

  const leftDirect = () => {
    // setAnimationClass(!animationClass)
    // setRightAnimation(!rightAnimation)
    
    setPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3)
    setNextPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3)
    setLastPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3)
    setLastHiddenPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3 )
  }
  const rightDirect = () => {
    // setRightAnimation(!animationClass)
    // setAnimationClass(!rightAnimation)
    
    setPosition((prevState) => prevState > 0?  prevState - 1 : prevState + 3)
    setNextPosition((prevState) => prevState > 0?  prevState - 1 : prevState + 3)
    setLastPosition((prevState) => prevState > 0?  prevState - 1 : prevState + 3)
    setLastHiddenPosition((prevState) => prevState > 0?  prevState - 1 : prevState + 3)
  }  
  
  return (
    <>
      <Container 
        className='flex-col justify-center'
        fluid={true}
        mt="md"
        mb="xl" 
        px="xs"
      >
        <div className='flex justify-end m-2'>
          <Button bg={'#F2F3F5'} size="compact-xs" className='mx-1 !text-[#95A2D9] !border-gray-300' onClick={() => leftDirect()}>
            <IconArrowBadgeLeftFilled />
          </Button>
          <Button bg={'#F2F3F5'} size="compact-xs" className='!text-[#95A2D9] !border-gray-300' onClick={() => rightDirect()}>
            <IconArrowBadgeRightFilled />
          </Button>
        </div>
        
        <Grid>
          <CustomCarousel 
            position={position} 
            nextPosition={nextPosition} 
            setPosition={setPosition} 
            lastPosition={lastPosition}
            animationClass={animationClass}
            rightAnimation={rightAnimation}
            lastHiddenPosition={lastHiddenPosition}
          />
        </Grid>
      </Container> 
      </>
    );
}


export default DashboardBannerCards