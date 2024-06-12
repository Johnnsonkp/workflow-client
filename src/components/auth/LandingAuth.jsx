import { Button, Container, Group, Paper, SimpleGrid, Switch, SwitchGroup, Text, TextInput } from '@mantine/core';
import React, {useEffect, useState} from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/localstorage';

import AppLogoContainer from '../appLogo/AppLogoContainer';
import AuthForm from './AuthForm';
import { DefaultContainer } from '../boilerplate/DefaultContainer';
import HeroSection from '../hero/HeroSection';
import { LoadingContainer } from '../boilerplate/LoadingContainer';
import { ReactRailsFeatures } from '../featuresDisplay/ReactRailsFeacture';
import { UserCardInfo } from '../cards/userCardInfo/UserCardInfo';
import classes from './LandingAuth.module.css';
import { useAppState } from '../../store/AppState';
import {useNavigate} from 'react-router-dom'

export function LandingAuth() {
 const [userData, setUserData] = useState(null)
 const {state, dispatch} = useAppState()
 const navigate = useNavigate()
 const [userType, setUserType] = useState()
 const [currentUserSession, setCurrentUserSession] = useState()
 const [toggle, setToggle] = useState(false)
 const userAuthStatus = getItemFromLocalStorage('AUTH')

 useEffect(() => {
  if(userAuthStatus){
    setCurrentUserSession(userAuthStatus)
  }
 }, [])
 
 useEffect(() => {
  if(userData){ // checks / handles new user sign up + no JWT previous user sign in
    setUserType(`${userData.user.username || "user"} successfully logged in!`)
    setTimeout(() => {
      navigate("/personal")
    }, 5000);
  }
}, [userData])

 
  return (
    <Paper shadow="md" radius="lg" className='overflow-y-hidden'>
      <LoadingContainer className={`${classes.wrapper} overflow-y-hidden`}>
        <div className={`${classes.innerwrap}`}>
          <LoadingContainer className={`${classes.contacts} bg-[#f7f7f8] `}>
            <div className='w-[25%] px-4 rounded-xl bg-[#a2a3a54f]'>
              <AppLogoContainer 
                height={'300px'}
              />
            </div>
            <Text fz="lg" fw={700} className={`${classes.title} !mt-8`} c="#333">
              {userType || state.userAuthStatus.error}
            </Text>

            <div className={classes.heroWrapper}>
                <HeroSection />
                <ReactRailsFeatures />
            </div>
            
          </LoadingContainer>
            {
              currentUserSession?.token ? 
              <div className='flex align-middle justify-center relative top-24 left-40 '>
                <UserCardInfo state={state} user={userAuthStatus} navigate={navigate}/>
              </div> : 
                <AuthForm setUserData={setUserData} userData={userData}/>
            }
        </div>
      </LoadingContainer>
    </Paper>
  );
}