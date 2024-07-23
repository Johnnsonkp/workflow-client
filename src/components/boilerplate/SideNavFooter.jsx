import {IconLogout, IconPlayerStopFilled} from '@tabler/icons-react';
import React,{useEffect, useState} from 'react';
import { SegmentedControl, Text } from '@mantine/core';

import CustomButton from './CustomButton';
import { Links } from './Tabs';
import { LoadingContainer } from './LoadingContainer';
import classes from './NavbarSegmented.module.css';
import { useAppState } from '../../store/AppState';
import { useNavigate } from 'react-router-dom';
import { userSignOut } from '../../actions/userActions';

const SideNav = ({section, urlRedirect, className}) => {
  const [active, setActive] = useState('Dashboard');
  const [tabNavigate, setTabNavigate] = useState();
  const {state, dispatch} = useAppState()
  const navigate = useNavigate()


  useEffect(() => {

    if(tabNavigate !== undefined){
        navigate(tabNavigate)
    }
  }, [tabNavigate])

  return (
    <nav className={`${classes.navbar} ${className}`}>
        <div className={`${classes.innerSideNav}`}>
            <div>
                <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
                </Text>
                <SegmentedControl
                    radius="lg"
                    className={`${classes.controller}`}
                    value={section}
                    onChange={(value) => urlRedirect(value)}
                    transitionTimingFunction="ease"
                    fullWidth
                    data={[
                        { label: 'User XP', value: 'Userxp' },
                        { label: 'Personal', value: 'Dashboard' },
                    ]}
                />
            </div>
            <LoadingContainer className={classes.navbarMain}>
                <Links setTabNavigate={setTabNavigate} active={active} setActive={setActive} section={section}/>
            </LoadingContainer>
        </div>
    </nav>
  )
}

export default SideNav
