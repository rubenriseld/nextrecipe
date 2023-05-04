import Header from "../components/Header"
import ScrollTopBtn from "./ScrollButton";
import Footer from "../components/Footer"


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
        <main>
            <Outlet/>
        </main>
        <ScrollTopBtn/>
        <Footer/>

        </>
    )
}
