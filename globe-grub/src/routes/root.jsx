import Header from "../components/header"
import Footer from "../components/footer"

import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Route,
    Link,
  } from 'react-router-dom'

export default function Root() {
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}