import { useCallback, useEffect, useState } from 'react';

import { LoadingContainer } from './LoadingContainer';
import Nav from "../TopNav/Nav";
import SideNav from './SideNavFooter';
import bpClasses from './Boilerplate.module.css'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import { setItemToLocalStorage } from '../../utils/localstorage';
import { storeUserData } from '../../actions/userActions';
import { taskFormActions } from '../../actions/taskActions.js';
import { useAppState } from '../../store/AppState';
import { useNavigate } from 'react-router-dom'

function PageBoilerPlate({ component }) {
    const navigate = useNavigate()
    const [section, setSection] = useState('Personal');
    const {state, dispatch} = useAppState()
    const userAuthorised = getItemFromLocalStorage('AUTH')

    const AuthToken = userAuthorised? userAuthorised.token : null
    const statePresence = state.userAuthStatus.isUserLoggedIn
    
    const urlRedirect = (value) => {
      setSection(value)
      return navigate(`/${value}`);
    }

    const loadTasks = useCallback(async () => {
      try {
        const taskActions = await taskFormActions['get'];
        const data = await taskActions(userAuthorised);
        return data
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    }, []);

    // useEffect(() => {
    //   setSection(`${window.location.pathname.replace('/', '')}`)
    // }, [])

    const CustomLayout = () => {
      useEffect(() => {
        if(userAuthorised && state.tasks === null){
          loadTasks().then((data) => {
            dispatch({type: "ALL_TASK", payload: data})
          });
        }
      }, [userAuthorised])


      return (
        <>
          <Nav />
          <LoadingContainer className={`flex justify-between min-h-[93vh]`}>
              <SideNav section={section} urlRedirect={urlRedirect} />
              <LoadingContainer className={`${bpClasses.component} p-7 pt-4 mt-12 shadow-xl`}>
                <div className=' max-w-[1800px] !m-[auto] pt-0'>{component}</div>
              </LoadingContainer>
          </LoadingContainer>
        </>
      );
    };
    return component ? <CustomLayout /> : "loading...";
  }
  export default PageBoilerPlate;