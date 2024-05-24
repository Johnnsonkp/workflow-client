import { useEffect, useState } from 'react';

import { LoadingContainer } from './LoadingContainer';
import Nav from "../Nav";
import SideNav from './SideNavFooter';
import bpClasses from './Boilerplate.module.css'
import { getItemFromLocalStorage } from '../../utils/localstorage';
import { setItemToLocalStorage } from '../../utils/localstorage';
import { storeUserData } from '../../actions/userActions';
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

    const CustomLayout = () => {
      return (
        <>
          <Nav />
          <LoadingContainer className={`flex justify-between min-h-[93vh]`}>
              <SideNav section={section} urlRedirect={urlRedirect} />
              <LoadingContainer className={`${bpClasses.component} p-7 pt-4 mt-12 shadow-xl`}>
                <div className=' max-w-[1800px] !m-[auto] pt-3'>{component}</div>
              </LoadingContainer>
          </LoadingContainer>
        </>
      );
    };
    return component ? <CustomLayout /> : "loading...";
  }
  export default PageBoilerPlate;