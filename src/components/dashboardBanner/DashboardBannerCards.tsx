import { Avatar, Button, Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Skeleton } from '@mantine/core';
import { IconArrowAutofitLeft, IconArrowBadgeLeft, IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import React, {Children, useEffect, useState} from 'react';

import { EmptyTaskModal } from '../EmptytTaskModals/EmptyTaskModal';
import StandUpCardCustom from '../cards/standUpCards/StandUp';
import StatsRingCard from '../cards/taskStats/TaskCardStatsCard';
import { TablerIconsProps } from '@tabler/icons-react';
import { Task } from '../../types/GlobalTypes';
import TimeLineCardDIsplay from '../timelineCard/TimeLine.jsx'
import { UserInfoAction } from '../auth/UserCard';
import classes from './dashboard.module.css'

interface Props {
  taskObj: Task[] | undefined
}

const CardContainerCx = ({children, title}) => {
  const child = <Skeleton height={200} radius="md" animate={false} />;
  const [loadingComponent, setLoadingComponent]: any = useState(true)
  const [activeTab, setActiveTab] = useState()
  let darkMode = JSON.parse(localStorage.getItem('dark_mode'))

  useEffect(() => {
    console.log("dashboard rerender")
    setTimeout(() => {
      setLoadingComponent(false)
    }, 200)
  }, [])

  useEffect(() => {
    setActiveTab(title && Array.isArray(title)? title[0] : title)
  }, [title])


  return (
    loadingComponent? child : <div className={`${classes.cardContainer} ${darkMode && 'border-4 border-[#5E5E5E]' }`}>
      {/* <div className={`${classes.cardContainer}`}> */}
        <div className={`${classes.innerCard}`}>
          {title && Array.isArray(title)?
            <div 
              className='flex'>
              <Group 
                onClick={() => setActiveTab(title[0])}
                mt="2" mb='0' mx={'1'} px={'10'} className={`${classes.tab} ${activeTab === title[0] && "!bg-[#F9FAFA]"}`}>
                  <Text fz="xs" fw={500}>{title[0]}</Text>
              </Group>

              <Group 
                onClick={() => setActiveTab(title[1])}
                mt="2" mb='0' mx={'1'} px={'10'} className={`${classes.tab} ${activeTab === title[1] && "!bg-[#F9FAFA]"}`}>
                <Text fz="xs" fw={500}>{title[1]}</Text>
              </Group>
            </div>
            : 
            <Group mt="2" mb='0' px={'10'} className={`${classes.tab} ${activeTab === title && "!bg-[#F9FAFA]"}`}>
              {/* <Text fz="xs" fw={500}>{title}</Text> */}
              <Text fz="xs" fw={500}>{activeTab}</Text>
            </Group>
          }
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
    title: ['Stand up', 'Stand down'],
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
  <>
    <DashboardCardComp className={``} title={data[position].title} Comp={data[position].component} />
    <DashboardCardComp className={`${classes.defaultCarousel}`} title={data[nextPosition].title} Comp={data[nextPosition].component} />
    <DashboardCardComp className={`${classes.defaultCarousel}`} title={data[lastPosition].title} Comp={data[lastPosition].component} />
  </>
)


const DashboardBannerCards: React.FC<Props> = (loadingComponent) => {
  const [position, setPosition]: any = useState(0)
  const [nextPosition, setNextPosition]: any = useState(position + 1)
  const [lastPosition, setLastPosition]: any = useState(position + 2)
  const [lastHiddenPosition, setLastHiddenPosition]: any = useState(position + 3)
  const [toggle, setToggle] = useState(false)


  const [animationClass, setAnimationClass]: any = useState(false)
  const [rightAnimation, setRightAnimation]: any = useState(false)

  const leftDirect = () => {    
    setPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3)
    setNextPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3)
    setLastPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3)
    setLastHiddenPosition((prevState) => prevState < 3? prevState + 1 : prevState - 3 )
  }
  const rightDirect = () => {    
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
          <Button 
            bg={'#F2F3F5'} 
            size="compact-xs" 
            className='mx-1 !text-[#95A2D9] !border-gray-300' onClick={() => leftDirect()}
          >
            <IconArrowBadgeLeftFilled />
          </Button>
          <Button 
            bg={'#F2F3F5'} 
            size="compact-xs" 
            className='!text-[#95A2D9] !border-gray-300' onClick={() => rightDirect()}
          >
            <IconArrowBadgeRightFilled />
          </Button>
        </div>
        
        <Grid>
          { loadingComponent?
            <CustomCarousel 
              position={position} 
              nextPosition={nextPosition} 
              setPosition={setPosition} 
              lastPosition={lastPosition}
              animationClass={animationClass}
              rightAnimation={rightAnimation}
              lastHiddenPosition={lastHiddenPosition}
            /> : <EmptyTaskModal />
          }

        </Grid> 
      </Container> 
      </>
    );
}


export default DashboardBannerCards