import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import IndexPage from "./components/index/IndexPage";
import RecipePage from "./components/recipe/RecipePage";
import Map from "./components/around-the-world/Map";
import AboutUs from "./components/about-us/AboutPage";

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
