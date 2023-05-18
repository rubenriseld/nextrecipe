import Header from "../components/common/Header"
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import Footer from "../components/common/Footer"


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
