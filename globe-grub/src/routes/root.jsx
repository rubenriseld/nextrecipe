import Header from "../components/header"
import Footer from "../components/footer"
import Ad from "../components/ad"
import Result from "../components/resultcontainer"
import GeoSearch from "../components/geosearch"

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
        <GeoSearch/>
        <Outlet/>
        <Footer/>
        </>
    )
}