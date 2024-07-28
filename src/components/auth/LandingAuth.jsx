import { Button, Container, Group, Paper, SimpleGrid, Switch, SwitchGroup, Text, TextInput } from '@mantine/core';
import { Grid, Skeleton, rem } from '@mantine/core';
import React, {useEffect, useState} from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/localstorage';

import AppLogoContainer from '../appLogo/AppLogoContainer';
import AuthForm from './AuthForm';
import HeroSection from '../hero/HeroSection.tsx';
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
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs"  className={`${classes.wrapper} overflow-hidden`} >
        <Grid gutter="md" className={`${classes.contacts} p-10`}>
          <AppLogoContainer />
          <Grid gutter="md" className='mt-10'>
            <Text fz="lg" fw={700} className={`${classes.title} !mt-0`} c="#333" >
              {userType || state.userAuthStatus.error}
            </Text>
          </Grid>

          <Grid gutter="md" className='mt-5'>
              <HeroSection />
              <ReactRailsFeatures />
          </Grid>
        </Grid>

        <Grid gutter="md" justify='center' align='end' className='flex items-center justify-center min-h-screen'>
          <div className='flex justify-center w-[100%] h-[100%]'>
            {
              currentUserSession?.token ? 
              <div className='flex align-middle justify-center '>
                <UserCardInfo state={state} user={userAuthStatus} navigate={navigate}/>
              </div> : 
                <AuthForm setUserData={setUserData} userData={userData}/>
            }
          </div>
        </Grid>        
      </SimpleGrid>
  );
}
