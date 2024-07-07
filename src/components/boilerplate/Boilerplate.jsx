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
    const [section, setSection] = useState('Personal');
    const {state, dispatch} = useAppState()
    const [prevStateTask, setPrevStateTask] = useState(state.tasks || []);
    const [prevStandUp, setPrevStandUp] = useState(state.standup)

    const userAuthorised = getItemFromLocalStorage('AUTH')
    
    const urlRedirect = (value) => {
      setSection(value)
      return navigate(`/${value}`);
    }

    const loadTasks = async () => {
      const taskActions = await taskFormActions['get'];
      const data = await taskActions(userAuthorised);

      if(data){
        dispatch({type: "ALL_TASK", payload: data})
        setPrevStateTask(data)
      }
    }

    const loadStandUp = async () => {
      const standupActions = await standupFormActions['get'];
      const data = await standupActions(userAuthorised);

      if(data && !prevStandUp){
        setPrevStandUp(data)
        dispatch({type: "LATEST_STAND_UP", payload: {
          id: data.stand_up.id,
          date: data.stand_up.date,
          standup_tasks: data.standup_tasks
        }})
      }
    }

    useEffect(() => { // On mount fetch request for tasks
      if(userAuthorised && prevStateTask.length === 0){
        console.log("BOILERPLATE: initial task load")

        dispatch({type: 'AUTH', payload: userAuthorised})
        loadTasks()
        loadStandUp()
      } 
      if(userAuthorised && state.refreshState){
        console.log("BOILERPLATE: refresh task load")
        console.log("BOILERPLATE: state.refreshState", state.refreshState)

        dispatch({type: 'AUTH', payload: userAuthorised})
        loadTasks()
        dispatch({type: 'STATE_REFRESH', payload: false})
      }
      if(!userAuthorised){
        alert("User must be signed in")
        navigate('/')
      }
    }, [state.refreshState])

    const CustomLayout = () => {

      return (
        <Grid gutter="xs" overflow="hidden">
            <Grid.Col>
              <Nav />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3.3, sm:2.9, md: 2.5, lg: 1.8 }} className='!max-w-[220px]'>
              <SideNav section={section} urlRedirect={urlRedirect} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 8.4, sm: 9, md: 9.4, lg: 10.2 }} className=''>
              <LoadingContainer className={`${bpClasses.component} p-7 pt-4 mt-9 shadow-xl`}>
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
