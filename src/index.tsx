import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';

const routes = createBrowserRouter([
  {
      element: < App />,
      children: [
          {
              path: "/",
              element: < Main />
          },
          {
          path: "/login",
          element: < Login />
          },
          {
          path: "/register",
          element: < Register />
          }
      ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={routes} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
