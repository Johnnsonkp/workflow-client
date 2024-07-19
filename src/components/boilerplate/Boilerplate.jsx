import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { LoadingContainer } from './LoadingContainer';
import Nav from "../TopNav/Nav";
import SideNav from './SideNavFooter';
import bpClasses from './Boilerplate.module.css'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import { setItemToLocalStorage } from '../../utils/localstorage';
import { standupFormActions } from '../../actions/standupActions';
import { storeUserData } from '../../actions/userActions';
import { taskFormActions } from '../../actions/taskActions.js';
import { useAppState } from '../../store/AppState';
import { useNavigate } from 'react-router-dom'

function PageBoilerPlate({ component }) {
    const navigate = useNavigate()
    // const [section, setSection] = useState('Personal');
    const [section, setSection] = useState('Dashboard');
    const {state, dispatch} = useAppState()
    const [prevStateTask, setPrevStateTask] = useState([]);
    const [prevStandUp, setPrevStandUp] = useState()
    let darkMode = JSON.parse(localStorage.getItem('dark_mode'))
    const [darkLightMode, setDarkLightMode] = useState(darkMode);

    const userAuthorised = getItemFromLocalStorage('AUTH')
    
    const urlRedirect = (value) => {
      setSection(value)
      return navigate(`/${value}`);
    }

    const loadTasks = async () => {
      const taskActions = await taskFormActions['get'];
      const data = await taskActions(userAuthorised);

      setTimeout(() => {
        if(data){
          dispatch({type: "ALL_TASK", payload: data})
          dispatch({type: 'AUTH', payload: userAuthorised})
          dispatch({type: 'STATE_REFRESH', payload: false})
          setPrevStateTask(data)
        }
      }, 500)
    }

    const loadStandUp = async () => {
      const standupActions = await standupFormActions['get'];
      const data = await standupActions(userAuthorised);

      setTimeout(() => {
        if(data && !prevStandUp){
          setPrevStandUp(data)
          dispatch({type: "LATEST_STAND_UP", payload: {
            id: data.stand_up.id,
            date: data.stand_up.date,
            standup_tasks: data.standup_tasks
          }})
        }
      }, 500)
    }

    useEffect(() => { // On mount fetch request for tasks
      if(userAuthorised && prevStateTask.length === 0){
        loadTasks()
        loadStandUp()
      } 
      if(userAuthorised && state.refreshState){
        loadTasks()
      }
      if(!userAuthorised){
        alert("User must be signed in")
        navigate('/')
      }

      console.log("boilerplate page reloaded")

    }, [state.refreshState])

    const CustomLayout = () => {

      return (
        <Grid 
          className={`${darkLightMode? '!bg-[#2D333B]' : 'bg-[#F0F0F0]' }`} 
          // className={`${darkLightMode? '!bg-[#313131]' : 'bg-[#F0F0F0]' }`} 
          gutter="xs" 
          overflow="hidden"
        >
            <Grid.Col>
              <Nav 
                className={`${darkLightMode? '!bg-[#2D333B]' : 'bg-[#F0F0F0]' }`} 
                setDarkLightMode={setDarkLightMode}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3.3, sm:2.9, md: 2.5, lg: 1.8 }} className={`!max-w-[220px] `}>
              <SideNav 
                // className={`${darkLightMode? '!bg-[#1C2127]' : 'bg-[#F0F0F0]' }`}  
                className={`${darkLightMode? '!bg-[#2D333B]' : 'bg-[#F0F0F0]' }`}
                // className={`${darkLightMode? '!bg-[#313131]' : 'bg-[#F0F0F0]' }`}  
                section={section} 
                urlRedirect={urlRedirect} 
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 8.4, sm: 9, md: 9.4, lg: 10.2 }} 
              // className={`${bpClasses.wrapper} 
              //   ${darkLightMode? '!bg-[#2D333B] border border-[#5E5E5E] mt-10' : 'bg-[#fff] border border-[#f4f4f4] mt-10'} transition-colors ease-in-out !delay-1000`}
              className={`${bpClasses.wrapper} 
                ${darkLightMode? '!bg-[#1C2127] border border-[#5E5E5E] mt-10' : 'bg-[#fff] border border-[#f4f4f4] mt-10'} transition-colors ease-in-out !delay-1000`}
              
            >
              <LoadingContainer className={`${bpClasses.component} p-7 pt-4 mt-1`}>
                  <div className={` max-w-[1800px] !m-[auto] pt-0`}>
                    {component}
                  </div>
              </LoadingContainer>
            </Grid.Col>    
        </Grid>
      );
    };
    return component ? <CustomLayout /> : "loading...";
  }
  export default PageBoilerPlate;

  // #3A3A3A