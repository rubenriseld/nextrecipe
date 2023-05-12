import React from "react";
import ReactDOM from "react-dom/client";
import "./react.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import IndexPage from "./components/IndexPage";
import RecipePage from "./components/RecipePage";
import Map from "./components/Map";
import AboutUs from "./components/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/recipe/:recipeId", //routing för enskild receptsida
        element: <RecipePage />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <RouterProvider router={router} />

);
