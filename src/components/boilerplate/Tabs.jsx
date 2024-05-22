import {
    IconBellRinging,
    IconCalendar,
    IconDashboard,
    IconDatabaseImport,
    IconDeviceProjector,
    IconFileAnalytics,
} from '@tabler/icons-react';

import classes from './NavbarSegmented.module.css';

export const tabs = {
    Work: [
        { link: '', label: 'Call workflows', icon: IconBellRinging },
        { link: '', label: 'Med abreviations', icon: IconDatabaseImport },
        { link: '', label: 'External links', icon: IconDatabaseImport },
        { link: '', label: 'Trackers', icon: IconDatabaseImport },
      ],
      Personal: [
        { link: '/personal', label: 'Dashboard', icon: IconDashboard },
        { link: '', label: 'Projects Overview', icon: IconDeviceProjector },
        { link: '', label: 'RYLLAB', icon: IconFileAnalytics },
        { link: '', label: 'Calendar', icon: IconCalendar },
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