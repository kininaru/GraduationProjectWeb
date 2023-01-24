import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import "./components/NotificationHandler"
import NotificationHandler from './components/NotificationHandler';

const router = createBrowserRouter([
  {
      path: "/",
      element: <MainPage />
  }, {
      path: "/login",
      element: <LoginPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationHandler/>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
