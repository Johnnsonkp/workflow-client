import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFileAnalytics,
  IconFingerprint,
  IconKey,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconReceiptRefund,
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
} from '@tabler/icons-react';
import { SegmentedControl, Text } from '@mantine/core';

import Nav from "./components/Nav";
import classes from './NavbarSegmented.module.css';
import { useState } from 'react';

const tabs = {
    account: [
      { link: '', label: 'Call workflows', icon: IconBellRinging },
      { link: '', label: 'Med abreviations', icon: IconDatabaseImport },
      { link: '', label: 'External links', icon: IconDatabaseImport },
      { link: '', label: 'Trackers', icon: IconDatabaseImport },
    ],
    personal: [
      { link: '', label: 'Notes', icon: IconShoppingCart },
      { link: '', label: 'Files', icon: IconFileAnalytics },
    ],
  };

function PageBoilerPlate({ component }) {
    const [section, setSection] = useState('account');
    const [active, setActive] = useState('Billing');

    const CustomLayout = () => {
        const links = tabs[section].map((item) => (
            <a
              className={classes.link}
              data-active={item.label === active || undefined}
              href={item.link}
              key={item.label}
              onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
              }}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </a>
          ));
          
      return (
        <>
            <Nav />
            <div className='flex justify-between min-h-[93vh]'>
                <nav className={`${classes.navbar} flex-[0.1]`}>
                    <div>
                        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
                        bgluesticker@mantine.dev
                        </Text>

                        <SegmentedControl
                            value={section}
                            onChange={(value) => setSection(value)}
                            transitionTimingFunction="ease"
                            fullWidth
                            data={[
                                { label: 'Account', value: 'account' },
                                { label: 'Personal', value: 'personal' },
                            ]}
                        />
                    </div>

                    <div className={classes.navbarMain}>{links}</div>

                    <div className={classes.footer}>
                        <a href="https://myemergencydr.sharepoint.com/sites/SupportPortal" 
                            target="_blank"
                            className={classes.link}>
                            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                            Support Portal
                        </a>
                    </div>
                </nav>

                <div className='w-[100%] flex-[0.9]'>
                    {component}
                </div>                
            </div>
        </>
      );
    };
    return component ? <CustomLayout /> : "loading...";
  }
  
  export default PageBoilerPlate;