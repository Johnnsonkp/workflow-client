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
 

 useEffect(() => {
  if(userData){ // checks / handles new user sign up + no JWT previous user sign in
    setUserType("user successefully logined in!!")
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

            <div className={classes.wrapper}>
              <Container size={700} className={classes.inner}>
                <HeroSection />
              </Container> 
            </div>
            </LoadingContainer>
            {/* {
            currentUserSession?.jwt ? 
              "Current User session " : 
              <AuthForm setUserData={setUserData}/>
            } */}
            <AuthForm setUserData={setUserData}/>
        </div>
      </LoadingContainer>
    </Paper>
  );
}