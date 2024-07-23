import { Button, Container, Group, Paper, SimpleGrid, Switch, SwitchGroup, Text, TextInput } from '@mantine/core';
import { Grid, Skeleton, rem } from '@mantine/core';
import React, {useEffect, useState} from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/localstorage';

import AppLogoContainer from '../appLogo/AppLogoContainer';
import AuthForm from './AuthForm';
import { DefaultContainer } from '../boilerplate/DefaultContainer';
import HeroSection from '../hero/HeroSection.tsx';
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
      navigate("/dashboard")
    }, 1000);
  }
}, [userData])

 
  return (
    // <Paper shadow="md" radius="lg" className='overflow-y-hidden'>
    // <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs"  className={`${classes.wrapper} border border-red-400 overflow-hidden`} >

        {/* <LoadingContainer className={`${classes.wrapper} overflow-y-hidden`}> */}
        {/* <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md"> */}
          {/* <div className={`${classes.innerwrap}`}> */}
          
            {/* <LoadingContainer className={`${classes.contacts} bg-[#f7f7f8] `}> */}
            <Grid gutter="md" className={`${classes.contacts} p-10`}>
              {/* <div className='w-[180px] px-4 rounded-xl bg-[#a2a3a54f]'> */}
              <div className='w-[180px] px-4 rounded-xl'>
                <AppLogoContainer 
                  height={'100px'}
                />
              </div>
              <Grid gutter="md" className='mt-20'>
                <Text fz="lg" fw={700} className={`${classes.title} !mt-0`} c="#333" >
                  {userType || state.userAuthStatus.error}
                </Text>
              </Grid>

              {/* <div className={classes.heroWrapper}> */}
                  <HeroSection />
                  <ReactRailsFeatures />
              {/* </div> */}
              </Grid>
              
            {/* </LoadingContainer> */}
            <Grid gutter="md" >
              {
                currentUserSession?.token ? 
                <div className='flex align-middle justify-center relative top-24 left-40'>
                  <UserCardInfo state={state} user={userAuthStatus} navigate={navigate}/>
                </div> : 
                  <AuthForm setUserData={setUserData} userData={userData}/>
              }
              </Grid>
          {/* </div> */}

          {/* </SimpleGrid> */}
        {/* </LoadingContainer> */}

        
      </SimpleGrid>
  );
}
