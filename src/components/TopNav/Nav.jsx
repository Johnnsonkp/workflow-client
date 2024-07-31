import {Avatar, Button, Group, Menu, Modal, SegmentedControl, rem} from '@mantine/core';
import {IconLogout, IconPlayerStopFilled, IconSettings, IconSwitchHorizontal} from '@tabler/icons-react';
import { IconMenu, IconMenu2 } from '@tabler/icons-react';
import React, {useEffect, useState} from 'react'

import { CustomSwitch } from '../customSwitch/CustomSwitch';
import { IconQuestionMark } from '@tabler/icons-react';
import { IconSwitch } from '@tabler/icons-react';
import { SwitchGroup } from '@mantine/core';
import classes from './Nav.module.css'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import logo from '/public/workflows-logo.png'
import { mockUser } from '../../utils/mockData';
import { useAppState } from '../../store/AppState';
import { useDisclosure } from '@mantine/hooks';
import {useNavigate} from 'react-router-dom'
import { userSignOut } from '../../actions/userActions';

function Nav({setDarkLightMode, className}) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const {state, dispatch} = useAppState()
  const [active, setActive] = useState('/pricing');
  const [section, setSection] = useState('Personal');
  const navigate = useNavigate()
  const userData = state.userAuthStatus.isUserLoggedIn && state.user || getItemFromLocalStorage('AUTH')
  const parsedUserData = userData || mockUser  
  const [opened, { open, close }] = useDisclosure(false);
  

  let darkModeJSON = localStorage.getItem('dark_mode')
  let darkMode = JSON.parse(darkModeJSON)

  const [light, setLight] = useState(darkMode)
  const [checked, setChecked] = useState(darkMode)

  const handleNavigate = (value) => {
    if(window.location.pathname !== `/${value}`){
      return navigate(`/${value}`);
    }
  }

  function handleClick() {
    // setTimeout(() => {
      if(darkMode === true){
        localStorage.setItem('dark_mode', false)
      }
      if(darkMode === false){
        localStorage.setItem('dark_mode', true)
      }
      setLight(darkMode)
      setDarkLightMode((prevState) => !prevState)
    // }, 400)

  }

  const handleSignOut = (item) => {
    userSignOut('AUTH')
    dispatch({type: "LOGGED_OUT"})
    navigate("/")
  }

  useEffect(() => {
    setSection(window.location.pathname.slice(1))
    if(darkMode === null){
      localStorage.setItem('dark_mode', false)
    }
  }, [])
  
  return (
   <div className={` ${classes.navContainer} overflow-hidden ${className}`}>
        <div className='flex !align-middle px-2'>
          <a href="/" className='w-[200px] h-[50px]'>
            <img src={logo} className='w-[145px] h-[60px]' />
          </a>
        </div>
        <Menu
            width={260}
            position="bottom-start"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          > 
            <div className='flex align-middle'>

              <Menu.Target className={`${classes.navRightButton} `}>
                <div className='cursor-pointer my-[auto] !bg-[transparent] !text-[#fff] uppercase p-3'>
                    <CustomSwitch 
                      className='!cursor-pointer' 
                      onClick={() => handleClick()}
                      // onChange={() => setChecked((prevState) => !prevState)}
                      checked={darkMode}
                    /> 
                </div>
              </Menu.Target>

              <Menu.Target className={`${classes.navRightButton} border-l-2 ${light? 'border-[#5E5E5E]' : 'border-white-500'}`}>
                <Group justify="center" p="xs">
                  <a className='cursor-pointer my-[auto] !bg-[transparent] !text-[#fff] uppercase p-3'
                    href="/about"
                  >
                      <IconQuestionMark size={23} color='#999'/>
                  </a>
                </Group>
              </Menu.Target>

              <div className={`${classes.navRightButton} w-[100%] flex px-3 border-l-2 ${light? 'border-[#5E5E5E]' : 'border-white-500'}`}>
                <Menu.Target>
                  <Avatar 
                    className='cursor-pointer my-[auto] !bg-[#333] !text-[#fff] uppercase'
                    size={35} 
                    alt={parsedUserData.username}>
                      {parsedUserData? parsedUserData.username?.slice(0,1) : "T"}
                  </Avatar>
                </Menu.Target>
                
                <Menu.Target>
                  <div className='flex-col px-2 py-1 my-[auto]'>
                    <p className='text-[12px] text-gray-500'>{parsedUserData && parsedUserData.username}</p>
                    <p className='text-[12px] text-gray-500'>{parsedUserData && parsedUserData.email}</p>
                  </div>
                </Menu.Target>
              </div>
              
            </div>

            
          <Menu.Dropdown className='flex-col'>
            <Menu.Item
                className='flex !align-middle justify-center'
                leftSection={
                    <Avatar 
                      className='cursor-pointer my-[auto] !bg-[#333] !text-[#fff]'
                      size={40} 
                      alt={parsedUserData.username}>
                        {parsedUserData? parsedUserData.username.slice(0,1) : "T"}
                    </Avatar>
                }
              >
                <a href={`http://localhost:3000/users/${parsedUserData.user_id}`}>{parsedUserData && parsedUserData.username}</a>
                <h3>{parsedUserData && parsedUserData.email}</h3>
              </Menu.Item>

              <Menu.Divider />
              <Menu.Label>Settings</Menu.Label>

              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Account settings
              </Menu.Item>

              <Menu.Item
                color="red"
                // onClick={open}
                onClick={() => handleSignOut()}
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Logout
              </Menu.Item>

              <Modal opened={opened} onClose={close} title="Do you wish to sign out" centered>
                <div className='flex justify-between w-32'>
                    <Button onClick={() => handleSignOut()}>Yes</Button>
                    <Button onClick={close}>No</Button>
                </div>
            </Modal>
            </Menu.Dropdown>
          </Menu>
    </div>
  )
}

export default Nav