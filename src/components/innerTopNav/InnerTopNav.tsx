import * as classes from './InnerTopNav.module.css';

import { Burger, Container, Group, SegmentedControl } from '@mantine/core';
import { useEffect, useState } from 'react';

import { DefaultContainer } from '../boilerplate/DefaultContainer';
import { IconDashboard } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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
  data?: (string | Link)[];
  value?: (string | Link)[];
}

const InnerTopNav: React.FC<Props> = ({ setTogglePanel, data, value}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [section, setSection] = useState('list');

  const urlRedirect = (value: any) => {
    setTogglePanel(value)
    setSection(value)
  }

  return (
    <header className={`${classes.header} border border-#D1D1D1 bg-white rounded-md h-[560px] mt-3 !mb-5`}>
    {/* // <header className={`${classes.header} shadow-md border border-#D1D1D1 bg-white rounded-sm h-[560px]`}> */}
    {/* <header className={`${classes.header} bg-white rounded-sm h-[560px]`}> */}
      <DefaultContainer className={classes.inner} >
        <div className='text-[18px] flex w-36 '>
         <IconDashboard color='gray'/> <h3 className='px-1 text-[18px] font-semibold' >Dashboard</h3>
        </div>

        <SegmentedControl
            size="xs"
            value={section}
            onChange={(value) => urlRedirect(value)}
            transitionTimingFunction="ease"
            color='#333'
            fullWidth
            data={[
                { label: 'List View', value: 'list' },
                { label: 'Day View', value: 'week' },
                { label: 'Week View', value: 'time' }
            ]}
        />

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="xs" />
      </DefaultContainer>
    </header>
  );
}

export default InnerTopNav