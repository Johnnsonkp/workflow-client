import * as classes from './InnerTopNav.module.css';

import { Burger, Container, Group, SegmentedControl } from '@mantine/core';
import { useEffect, useState } from 'react';

import { DefaultContainer } from '../boilerplate/DefaultContainer';
import { IconDashboard } from '@tabler/icons-react';
import SingleDate from '../weekView/SingleDate';
import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

let darkMode = JSON.parse(localStorage.getItem('dark_mode'))

export interface Link {               // interface describes the structure of the variable, Array or obj
  link: string;
  label: string;
  value?: string;   // The value property is optional in the Link array 
}

const links: Link[] = [              // an array [] of objects {}
  { link: '/pricing', label: 'List View', value: 'list' },
  { link: '/about', label: 'Day View', value: 'time' },
  { link: '/learn', label: 'Week View', value: 'week' },
];

interface Props {
  setTogglePanel: (value: string | undefined) => void;
  data?: any;  //TODO: add the right type 
  // data?: (Link)[];
  value?: (string | Link)[];
  title?: string
  tab1?: string
  tab2?: string
  activeTab?: string
  setTab1: (value: string | undefined) => void;
  setActiveTab: (value: string | undefined) => void;
  disableControl?: boolean;
}

const InnerTopNav: React.FC<Props> = ({ setTogglePanel, data, value, title, tab1, tab2, setTab1, disableControl, activeTab, setActiveTab}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [section, setSection] = useState(data && data[0]?.value || 'list');
  const [theme, setTheme] = useState(darkMode);

  const urlRedirect = (value: any) => {
    setSection(value)
    if(activeTab){
      setActiveTab(value)
    }else{
      setTogglePanel(value)
    }
  }

  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem('dark_mode')))
  }, [darkMode])

  return (
    <header className={`${classes.header} rounded-md h-[560px] mt-0 !mb-5 border border-#D1D1D1 text-[#333] ${theme && 'border-[1px] border-[#5E5E5E] text-[#fff]' }`}>
      <DefaultContainer className={classes.inner} >
        <div className='flex !items-center w-80 '>
          <Text className='flex align-middle my-[auto]'><IconDashboard className='my-[auto]' color='gray'/> </Text>
          <Text fz="xl" fw={500} px={'3'} className={` font-semibold  ${darkMode && 'text-[#fff]' }`} >{title}</Text>
          <SingleDate fz={'sm'} fw={400}/>
        </div>

        <SegmentedControl
            size="xs"
            value={section}
            onChange={(value) => urlRedirect(value)}
            transitionTimingFunction="ease"
            className={`text-[#333] z-0 ${disableControl && '!hidden'}`}
            fullWidth
            data={data || [
                { label: 'List View', value: 'list' },
                { label: 'Week View', value: 'week' },
                { label: 'Day View', value: 'time' }
            ]}
        />

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="xs" />
      </DefaultContainer>
    </header>
  );
}

export default InnerTopNav