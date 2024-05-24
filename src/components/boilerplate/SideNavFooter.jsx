import { Button, Modal } from '@mantine/core';
import {IconLogout, IconPlayerStopFilled} from '@tabler/icons-react';
import React,{useState} from 'react';
import { SegmentedControl, Text } from '@mantine/core';

import CustomButton from './CustomButton';
import { Links } from './Tabs';
import { LoadingContainer } from './LoadingContainer';
import classes from './NavbarSegmented.module.css';
import { removeItemFromLocalStorage } from '../../utils/localstorage';
import { useAppState } from '../../store/AppState';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { userSignOut } from '../../actions/userActions';

const SideNav = ({section, urlRedirect}) => {
  const [active, setActive] = useState('Dashboard');
  const [opened, { open, close }] = useDisclosure(false);
  const {state, dispatch} = useAppState()
  const navigate = useNavigate()

  const handleSignOut = (item) => {
    userSignOut('AUTH')
    dispatch({type: "LOGGED_OUT"})
    // navigate("/")
  }

  return (
    // <nav className={`${classes.navbar} w-56 !pt-16`}>
    <nav className={`${classes.navbar}`}>
        <div className={`${classes.innerSideNav}`}>
            <div>
                <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
                </Text>
                <SegmentedControl
                    className={`${classes.controller}`}
                    value={section}
                    onChange={(value) => urlRedirect(value)}
                    transitionTimingFunction="ease"
                    fullWidth
                    data={[
                        { label: 'Work', value: 'Work' },
                        { label: 'Personal', value: 'Personal' },
                    ]}
                />
            </div>
            <LoadingContainer className={classes.navbarMain}>
                <Links active={active} setActive={setActive} section={section}/>
            </LoadingContainer>
            <div className={classes.footer}>
                <Button onClick={open} className={` ${classes.signOut} text-white`}>
                    <IconLogout className={classes.linkIconCustom} stroke={1.5} />
                    <p>Sign out</p>
                </Button>
                <hr></hr>
                <Button className={`${classes.otherBtn}`}>
                    <IconLogout className={classes.linkIconCustom} stroke={1.5} />
                </Button>
            </div>
            <Modal opened={opened} onClose={close} title="Do you wish to sign out" centered>
                <div className='flex justify-between w-32'>
                    <Button onClick={() => handleSignOut()}>Yes</Button>
                    <Button onClick={close}>No</Button>
                </div>
            </Modal>
        </div>
    </nav>
  )
}

export default SideNav