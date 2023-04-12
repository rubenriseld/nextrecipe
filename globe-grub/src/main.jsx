import React from 'react'
import ReactDOM from 'react-dom/client'
import '../structure/css/react.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from 'react-router-dom'
import Root from "./routes/root";
import ErrorPage from "./error-page";
import IndexPage from './components/indexpage';
import RecipePage from './components/recipepage';

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
