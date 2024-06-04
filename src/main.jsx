import './index.css'
import '@mantine/core/styles.css';

import React, {useEffect} from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from './pages/About.jsx';
import App from './App.jsx'
import { AppState } from './store/AppState.jsx';
import Landing from './pages/Landing.jsx';
import { MantineProvider } from '@mantine/core';
import PageBoilerPlate from './components/boilerplate/Boilerplate.jsx';
import PersonalLanding from './pages/PersonalLanding.jsx';
import ReactDOM from 'react-dom/client'
import UserXP from './pages/UserXP';
import WorkLanding from './pages/WorkLanding.jsx';

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
    path: "/about",
    element:  <About/>,
    // element:  <PageBoilerPlate component={<About/>} />,
  },
  {
    path: "/personal",
    element: <PageBoilerPlate component={<PersonalLanding />} />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppState>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </AppState>
  </React.StrictMode>,
)
