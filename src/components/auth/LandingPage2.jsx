import './landing2.css'

import React, {useEffect, useState} from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/localstorage'

import AppLogoContainer from '../appLogo/AppLogoContainer';
import AuthForm from './AuthForm'
import LandingImg from '../../assets/landing_drawing.svg'
import LandingImg2 from '../../assets/landing2.svg'
import LandingImg3 from '../../assets/landing3.svg'
import LandingImg4 from '../../assets/landing4.svg'
import LandingSteps from './LandingSteps';
import Notification from '../notification/Notification';
import UserCardCustom from '../cards/userCardInfo/UserCardCustom'
import { UserCardInfo } from '../cards/userCardInfo/UserCardInfo';
import classes from './LandingAuth.module.css';
import { useAppState } from '../../store/AppState';
import {useNavigate} from 'react-router-dom'

function LandingPage2() {
  const [userData, setUserData] = useState(null)
  const [userType, setUserType] = useState()
  const [currentUserSession, setCurrentUserSession] = useState()
  const {state, dispatch} = useAppState()       
  const userAuthStatus = getItemFromLocalStorage('AUTH')
  const navigate = useNavigate()

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
  // bg-white
  return (
<div className={`relative min-h-screen flex `}>
    <div className={`flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white `}>
      <div className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative" 
      >
        <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
        <div className={`absolute triangle  min-h-screen right-0 w-16 `} ></div>
          <AppLogoContainer 
            className="flex absolute top-5 text-center text-gray-100 focus:outline-none border border-white-500 bg-white px-5  rounded-full !cursor-pointer"
          />
          <img src={LandingImg4} className="h-60 absolute right-2 mr-5 "/>
        <div className="w-full  max-w-md z-10 mt-24">
          <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-4">Simple. Effortless. Productivity.</div>
          <div className="sm:text-sm xl:text-md text-gray-200 font-normal xl:text-lg">
            Workflows allows you to make progress on the things that matter the most.
          </div>

          <LandingSteps 
            step_1={'Do Fewer Things'}
            step_2={'Work At A Natural Pace'}
            step_3={'Obsess Over Quality'}
          />

        </div>

        {/* <!---remove custom style--> */}
       <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      
      <div className={` md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white `}>
        <div className="max-w-md w-full space-y-8">          
          {currentUserSession?.token ?  
            <UserCardCustom state={state} user={userAuthStatus} navigate={navigate}/> 
            // <UserCardInfo state={state} user={userAuthStatus} navigate={navigate}/>
            :
            <AuthForm setUserData={setUserData} userData={userData}/>
          }

          <Notification className={`${state.notification.status === 'success'? 'visible' : 'hidden'}`} message={state.notification.message}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LandingPage2



