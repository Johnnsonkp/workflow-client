import {
    IconActivity,
    IconDashboard,
    IconLockAccess
} from '@tabler/icons-react';

import classes from './NavbarSegmented.module.css';
import { useEffect } from 'react';

export const tabs = {
    Userxp: [
      { link: '', label: 'Milestones', icon: IconLockAccess },
      { link: '', label: 'Stats', icon: IconLockAccess }
    ],
    Dashboard: [
      { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
      { link: '/habits', label: 'Habits', icon: IconActivity },
      { link: '', label: 'Projects Overview', icon: IconLockAccess },
      { link: '', label: 'RYLLAB', icon: IconLockAccess },
      { link: '', label: 'Calendar', icon: IconLockAccess },
    ],
};


export const Links = ({active, setActive, section, setTabNavigate}) => {
    useEffect(() => {
      let current_path = window.location.pathname.replace('/', '')
      let path = current_path.charAt(0).toUpperCase() + current_path.slice(1)
      setActive(path)
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
                // setActive(item.label);
                setTabNavigate(item.link)
              }}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </a>
        ));
    }
    
}