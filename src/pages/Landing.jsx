import React, {useEffect, useState} from 'react'

import { LandingAuth } from '../components/auth/LandingAuth';
import { Link } from "react-router-dom";
import { getTask } from '../services/taskService';
import { useAppState } from '../store/AppState';
import {useNavigate} from 'react-router-dom'

function Landing() {
  // const [taskObj, setTaskObj] = useState(null)


  // useEffect(() => {
  //   getTask('./taskObj.json')
  //     .then(json => {
  //       setTaskObj(json);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //   });
  // }, [])
 
  return (
    <LandingAuth />
  )
}

export default Landing



