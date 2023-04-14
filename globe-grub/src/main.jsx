import React from 'react'
import ReactDOM from 'react-dom/client'
import './react.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from 'react-router-dom'
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import IndexPage from './components/IndexPage';
import RecipePage from './components/RecipePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children:[
        {
            path:"/",
            element: <IndexPage/>,
        },
        {
            path:"/recipe",
            element: <RecipePage/>,
        },
    ]
},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
