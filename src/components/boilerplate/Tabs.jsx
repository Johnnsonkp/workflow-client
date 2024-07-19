import {
    IconActivity,
    IconDashboard,
    IconLockAccess,
    IconLockAccessOff
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import classes from './NavbarSegmented.module.css';

export const tabs = {
    Userxp: [
      { link: '', label: 'Milestones', icon: IconLockAccess },
      { link: '', label: 'Stats', icon: IconLockAccess }
    ],
    Dashboard: [
      { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
      { link: '/habits', label: 'Habits', icon: IconActivity },
      { link: '/Projects', label: 'Projects', icon: IconLockAccessOff },
      { link: '/RYLLAB', label: 'RYLLAB', icon: IconLockAccessOff },
      { link: '/Calendar', label: 'Calendar', icon: IconLockAccessOff },
    ],
};


export const Links = ({active, setActive, section, setTabNavigate}) => {
    useEffect(() => {
      let loadingDelay = setTimeout(() => {
        let current_path = window.location.pathname.replace('/', '')
        if(current_path){
          let path = current_path.charAt(0).toUpperCase() + current_path.slice(1)
          setActive(path)
        }
      }, 100)
      return () => {
        clearTimeout(loadingDelay)
      }
    }, [])
    
    if(section !== null){
        return tabs[section || 'Personal'].map((item) => (
            <a
              className={classes.link}
              data-active={item.label === active || undefined}
              href={item.link}
              key={item.label}
              onClick={(event) => {
                event.preventDefault();
                setTabNavigate(item.link)
              }}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </a>
        ));
    }
    
}