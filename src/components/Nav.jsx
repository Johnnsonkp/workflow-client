import {Avatar, Group, Menu, SegmentedControl, rem} from '@mantine/core';
import { IconMenu, IconMenu2 } from '@tabler/icons-react';
import React, {useEffect, useState} from 'react'

import classes from './Nav.module.css'
import { getItemFromLocalStorage } from '../utils/localstorage';
import logo from '/public/workflows-logo.png'
import { mockUser } from '../utils/mockData';
import { useAppState } from '../store/AppState';
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

  useEffect(() => {
    setSection(window.location.pathname.slice(1))
  }, [])
  
  return (
    <div className='px-3 bg-[#FAFBFC] flex justify-between !align-bottom fixed w-[100%] z-10 border border-bottom'>
        <div className='flex !align-middle z-30'>
          <div className='mt-3 pr-5 '><IconMenu2 color='#999' size={30} className='cursor-pointer'/></div>
          <a href="/" className='w-[200px] h-[50px]'>
            <img src={logo} className='w-[130px] h-[55px]' />
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