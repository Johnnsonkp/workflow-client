import { Button, Center, Group, Paper, RingProgress, Text, rem } from '@mantine/core';
import { Container, Grid, Skeleton } from '@mantine/core';
import { IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { dataIcon, moneyIcon, userIcon, userPlusIcon } from './dashboardIcons';

import DashboardCards2 from './DashboardCards2';
import { EmptyTaskModal } from '../EmptytTaskModals/EmptyTaskModal';
import StandUpCardCustom from '../cards/standUpCards/StandUp';
import StatsRingCard from '../cards/taskStats/TaskCardStatsCard';
import { Task } from '../../types/GlobalTypes';
import TimeLineCardDIsplay from '../timelineCard/TimeLine.jsx'
import { UserInfoAction } from '../auth/UserCard';
import classes from './dashboard.module.css'

interface Props {
  taskObj: Task[] | undefined
}

// const CardContainerCx = ({children, title}) => {
//   const [loadingComponent, setLoadingComponent]: any = useState(true)
//   const [activeTab, setActiveTab] = useState()
//   let darkMode = JSON.parse(localStorage.getItem('dark_mode'))

//   useEffect(() => {
//     const timer = setTimeout(() => setLoadingComponent(false), 200);
//     return () => clearTimeout(timer);
//   }, [])

//   useEffect(() => {
//     setActiveTab(title && Array.isArray(title)? title[0] : title)
//   }, [title])

//   if (loadingComponent) {
//     return <Skeleton height={200} radius="md" animate={false} />;
//   }

//   return (
//     <div className={`${classes.cardContainer} ${darkMode && 'border border-[#5E5E5E]'}`}>
//       <div className={`${classes.innerCard}`}>
//         {title && Array.isArray(title) ? (
//           <div className="flex">
//             {title.map((tabTitle) => (
//               <Group
//                 key={tabTitle}
//                 onClick={() => setActiveTab(tabTitle)}
//                 mt="2"
//                 mb="0"
//                 mx="1"
//                 px="10"
//                 className={`${classes.tab} ${activeTab === tabTitle && "!bg-[#F9FAFA]"}`}
//               >
//                 <Text fz="xs" fw={500}>{tabTitle}</Text>
//               </Group>
//             ))}
//           </div>
//         ) : (
//           <Group mt="2" mb="0" px="10" className={`${classes.tab} ${activeTab === title && "!bg-[#F9FAFA]"}`}>
//             <Text fz="xs" fw={500}>{activeTab}</Text>
//           </Group>
//         )}
//       </div>
//       {children}
//     </div>

//     // <DashboardCards2 children={children}/>
//   );
// }

const DashboardCardComp = ({title, Comp, className, SvgIcon}) => (
   <Grid.Col span={{ base: 12, lg: 4 }} className={className}>
    {/* <CardContainerCx title={title} children={<Comp />} /> */}
    <DashboardCards2 title={title} children={<Comp />} svgIcon={<SvgIcon />}/>
  </Grid.Col>
)

const data = [
  {
    title: 'UserXP',
    component: UserInfoAction,
    svgIcon: moneyIcon
  },
  {
    // title: ['Stand up', 'Stand down'],
    title: 'Stand up',
    component: StandUpCardCustom,
    svgIcon: userIcon
  },
  {
    title: 'Stats',
    component: StatsRingCard,
    svgIcon: dataIcon
  },
  {
    title: 'Monthly',
    component: TimeLineCardDIsplay,
    svgIcon: userPlusIcon
  },
]

const CustomCarousel = ({position, nextPosition, lastPosition}) => (
  <>
    <DashboardCardComp className={``} title={data[position].title} Comp={data[position].component} SvgIcon={data[position].svgIcon}/>
    <DashboardCardComp className={`${classes.defaultCarousel}`} title={data[nextPosition].title} Comp={data[nextPosition].component} SvgIcon={data[nextPosition].svgIcon}/>
    <DashboardCardComp className={`${classes.defaultCarousel}`} title={data[lastPosition].title} Comp={data[lastPosition].component} SvgIcon={data[lastPosition].svgIcon}/>
  </>
)


const DashboardBannerCards: React.FC<Props> = (loadingComponent) => {
  const [position, setPosition]: any = useState(0)

  const updatePositions = (direction: number) => {
    setPosition((prevState) => (prevState + direction + 4) % 4);
  };
  
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
            <Button bg="#F2F3F5" size="compact-xs" className="mx-1 !text-[#95A2D9] !border-gray-300" onClick={() => updatePositions(1)}>
              <IconArrowBadgeLeftFilled />
            </Button>
            <Button bg="#F2F3F5" size="compact-xs" className="mx-1 !text-[#95A2D9] !border-gray-300" onClick={() => updatePositions(-1)}>
              <IconArrowBadgeRightFilled />
            </Button>
          </div>
          
          <Grid>
            { loadingComponent?
              <CustomCarousel 
                position={position} 
                nextPosition={(position + 1) % 4}
                lastPosition={(position + 2) % 4}
              /> 
              : 
              <EmptyTaskModal />
            }

          </Grid> 
        </Container> 
        </> 
    );
}


export default DashboardBannerCards