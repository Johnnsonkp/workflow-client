import {
    IconBellRinging,
    IconCalendar,
    IconDashboard,
    IconDatabaseImport,
    IconDeviceProjector,
    IconFileAnalytics,
    IconLockAccess
} from '@tabler/icons-react';

import classes from './NavbarSegmented.module.css';

export const tabs = {
    Userxp: [
      { link: '', label: 'Milestones', icon: IconLockAccess },
      { link: '', label: 'Stats', icon: IconLockAccess }
    ],
    Personal: [
      { link: '/personal', label: 'Dashboard', icon: IconDashboard },
      { link: '', label: 'Projects Overview', icon: IconLockAccess },
      { link: '', label: 'RYLLAB', icon: IconLockAccess },
      { link: '', label: 'Calendar', icon: IconLockAccess },
    ],
};


export const Links = ({active, setActive, section}) => {
    if(section !== null){
        return tabs[section || 'Personal'].map((item) => (
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
    }
    
}