import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import SettingsProvider from './Context/Settings/Settings.jsx';
import AuthProvider from './Context/Auth/Auth.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App.js';
import ErrorPage from './Components/Error-page/error-page.jsx';
import SettingsPage from './Routes/Settings.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'settings',
    element: <SettingsPage />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>  
        <SettingsProvider>
            <RouterProvider router={router} />
            {/* <App /> */}
        </SettingsProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);