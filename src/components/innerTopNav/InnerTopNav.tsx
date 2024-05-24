import * as classes from './InnerTopNav.module.css';

import { Burger, Container, Group, SegmentedControl } from '@mantine/core';
import { useEffect, useState } from 'react';

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

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        setTogglePanel(link.value)
      }}
    >
      {link.label}
    </a>
  ));

  const urlRedirect = (value: any) => {
    setTogglePanel(value)
    setSection(value)
  }

  return (
    <header className={`${classes.header} border border-#D1D1D1 bg-white shadow-md rounded-sm h-[560px]`}>
      <Container size="lg" className={classes.inner}>
        <div className='text-[18px] font-semibold flex w-36'>
         <IconDashboard color='#464FEB'/> <h3 className='px-1 text-[18px] font-semibold' >Dashboard</h3>
        </div>
        {/* <Group gap={0} visibleFrom="xs" className='border border-gray-100'>
          {items}
        </Group> */}

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
      </Container>
    </header>
  );
}

export default InnerTopNav