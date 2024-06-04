import React, {useEffect, useState} from 'react'

import { LandingAuth } from '../components/auth/LandingAuth';
import { Link } from "react-router-dom";
import { getTask } from '../services/taskService';
import { useAppState } from '../store/AppState';
import {useNavigate} from 'react-router-dom'

function Landing() {
  const styles = {
    demoBtn: {
      backgroundColor: "#2CEEF0",
      ursor: "pointer",
      textDecoration: "none",
      lineHeight: "normal",
      transition: "all 0.15s ease-in-out 0s",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #2CEEF0",
      color: "#111",
      display: "flex",
      fontSize: "16px",
      fontWeight: "700",
      padding: "0.6em 0.7em",
      whiteSpace: "nowrap",
      textAlign: "center",
      width: "180px",
      marginTop: "55px",
      borderRadius: "8px",
    }
  }

  const [userData, setUserData] = useState(null)
  const [taskObj, setTaskObj] = useState(null)
  const {state, dispatch} = useAppState()
  const navigate = useNavigate()

  useEffect(() => {
    getTask('./taskObj.json')
      .then(json => {
        setTaskObj(json);
      })
      .catch(err => {
        console.error(err);
    });
  }, [])
 
  return (
    <LandingAuth />
  )
}

export default Landing



