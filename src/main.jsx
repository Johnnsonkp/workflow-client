import './index.css'
import '@mantine/core/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';
import React, {useEffect} from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from './pages/About.jsx';
import App from './App.jsx'
import { AppState } from './store/AppState.jsx';
import ComingSoon from './pages/ComingSoon';
import Habits from './pages/Habits';
import Landing from './pages/Landing.jsx';
import Monthly from './pages/Monthly';
import PageBoilerPlate from './components/boilerplate/Boilerplate.jsx';
import PersonalLanding from './pages/PersonalLanding.jsx';
import ReactDOM from 'react-dom/client'
import StandupPage from './pages/StandupPage';
import UserXP from './pages/UserXP';
import WorkLanding from './pages/WorkLanding.jsx';

let darkMode = JSON.parse(localStorage.getItem('dark_mode'))

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/app",
    element: <PageBoilerPlate component={<App />} />,
  },
  {
    path: "/work",
    element: <PageBoilerPlate component={<WorkLanding />} />,
  },
  {
    path: "/userxp",
    element: <PageBoilerPlate component={<UserXP />} />,
  },
  {
    path: '/habits',
    element: <PageBoilerPlate component={<Habits />} />,
  },
  {
    path: "/standups",
    element: <PageBoilerPlate component={<StandupPage />} />,
  },
  {
    path: "/about",
    element:  <About/>,
    // element:  <PageBoilerPlate component={<About/>} />,
  },
  {
    path: "/personal",
    element: <PageBoilerPlate component={<PersonalLanding />} />,
  },
  {
    path: "/dashboard",
    element: <PageBoilerPlate component={<PersonalLanding />} />,
  },
  {
    path: "/coming-soon",
    element: <PageBoilerPlate component={<ComingSoon />} />,
  },
  {
    path: "/Projects",
    element: <PageBoilerPlate component={<ComingSoon />} />,
  },
  {
    path: "/RYLLAB",
    element: <PageBoilerPlate component={<ComingSoon />} />,
  },
  {
    path: "/Calendar",
    element: <PageBoilerPlate component={<ComingSoon />} />,
  },
  {
    path: "/monthly",
    element: <PageBoilerPlate component={<Monthly />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppState>
      <MantineProvider className={`w-[100%] ${darkMode? '!bg-[#1C2127]' : 'bg-[#F0F0F0]' }`} theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </AppState>
  </React.StrictMode>,
)
