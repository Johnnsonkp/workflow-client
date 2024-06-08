import {Avatar, Group, Menu, SegmentedControl, rem} from '@mantine/core';
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
import {useNavigate} from 'react-router-dom'

function Nav() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const {state, dispatch} = useAppState()
  const [active, setActive] = useState('/pricing');
  const [section, setSection] = useState('Personal');
  const navigate = useNavigate()
  const userData = state.userAuthStatus.isUserLoggedIn && state.user || getItemFromLocalStorage('AUTH')
  const parsedUserData = userData || mockUser  

  const handleNavigate = (value) => {
    if(window.location.pathname !== `/${value}`){
      return navigate(`/${value}`);
    }
  }

  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } 
    if(localStorage.theme === "light") {
      localStorage.theme = "dark";
    }
  }

  useEffect(() => {
    setSection(window.location.pathname.slice(1))
  }, [])
  
  return (
   <div className={` ${classes.navContainer} overflow-hidden`}>
        <div className='flex !align-middle z-30 px-2'>
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
                    <CustomSwitch onClick={() => handleClick()}/> 
                </div>
              </Menu.Target>

              <Menu.Target className={`${classes.navRightButton} border-2 border-white-500`}>
                <Group justify="center" p="xs">
                  <a className='cursor-pointer my-[auto] !bg-[transparent] !text-[#fff] uppercase p-3'
                    href="/about"
                  >
                      <IconQuestionMark size={23} color='#999'/>
                  </a>
                </Group>
              </Menu.Target>

              <div className={`${classes.navRightButton} w-[100%] flex px-3`}>
                <Menu.Target>
                  <Avatar 
                    className='cursor-pointer my-[auto] !bg-[#333] !text-[#fff] uppercase'
                    size={35} 
                    alt={parsedUserData.username}>
                      {parsedUserData? parsedUserData.username?.slice(0,1) : "T"}
                  </Avatar>
                </Menu.Target>
                
                  <div className='flex-col px-2 py-1 my-[auto]'>
                    <p className='text-[12px] text-gray-500'>{parsedUserData && parsedUserData.username}</p>
                    <p className='text-[12px] text-gray-500'>{parsedUserData && parsedUserData.email}</p>
                  </div>
              </div>
            </div>
          <Menu.Dropdown className='flex'>
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
            </Menu.Dropdown>
          </Menu>
    </div>
  )
}

export default Nav