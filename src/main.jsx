import './index.css'
import '@mantine/core/styles.css';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import PageBoilerPlate from './Boilerplate.jsx';
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageBoilerPlate component={<App />} />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
