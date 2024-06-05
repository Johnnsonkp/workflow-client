import { Button, Container, Group, Paper, SimpleGrid, Switch, SwitchGroup, Text, TextInput } from '@mantine/core';
import React, {useEffect, useState} from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/localstorage';

import AppLogoContainer from '../appLogo/AppLogoContainer';
import AuthForm from './AuthForm';
import { DefaultContainer } from '../boilerplate/DefaultContainer';
import HeroSection from '../hero/HeroSection';
import { LoadingContainer } from '../boilerplate/LoadingContainer';
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
    <Paper shadow="md" radius="lg">
      <LoadingContainer className={classes.wrapper}>
        <div className={`${classes.innerwrap}`}>
          <LoadingContainer className={`${classes.contacts} bg-[#f7f7f8] `}>
              <AppLogoContainer />
            <Text fz="lg" fw={700} className={`${classes.title} !mt-8`} c="#333">
              {userType || state.userAuthStatus.error}
            </Text>

            <div className={classes.heroWrapper}>
              <Container size={700} className={classes.inner}>
                <HeroSection />
              </Container> 
            </div>

            <Text fz="lg" fw={500} className={`w-[90%] m-auto !mt-6 !px-5`} c="#333">
              Workflows allows you to make progress on the things that matter the most. Prioritize quality in everything you do and reclaim your valuable time back.
            </Text>
          </LoadingContainer>
            {
              currentUserSession?.token ? 
              <div className='flex align-middle justify-center'>
                <Button onClick={() => navigate("/personal")}>Back to work </Button>
              </div> : 
                <AuthForm setUserData={setUserData}/>
            }
            {/* <AuthForm setUserData={setUserData}/> */}
        </div>
      </LoadingContainer>
    </Paper>
  );
}