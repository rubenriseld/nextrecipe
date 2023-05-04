import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import Logo from "./Logo";
import Map from "./Map";

// function toggleMenu() {
//   let links =
//   if (links.style.display === "block") {
//       links.style.display = "none";
//   } else {
//       links.style.display = "block";
//   }
// }
export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  //för att toggla en klass på menylänkarna
  const [SearchResult, setSearchResult] = useSearchResult(
    (state) => [state.SearchResult, state.setSearchResult],
    shallow
  );


  //sticky header stuff
        const [sticky, setSticky] = useState(false);
        let lastScroll = 0;
        
        const mrScroll = () => {
            window.addEventListener('scroll', ()=>{
                const currentScroll = window.pageYOffset;
                if(currentScroll <=0){
                    setSticky(false);
                    return;
                }
            if(currentScroll > lastScroll ){
                setSticky(false);
            }else if (currentScroll < lastScroll){
                setSticky(true);
            }
            lastScroll = currentScroll;
        })}
        
        useEffect(()=>{
            const handleScrollEvent = () =>{
                mrScroll();
            }
            window.addEventListener('scroll', handleScrollEvent);
            return () => {
                window.addEventListener('scroll', handleScrollEvent);
            };
        }, []);


  return (
    <header className={`background-primary ${sticky ? "header-sticky":""} ${showMobileMenu?"header-fixed": ""}`}>
      {/* <header className="background-primary"> */}
      <nav className="menu max-width-container background-primary">
    
        <NavLink className="logo-link" to="/" onClick={() => {setSearchResult([]); setShowMobileMenu(false); }}>
        {/* window.location.reload(false); */}
          <Logo sloganVisible={false}/>
        </NavLink>

        <div
          className={`menu-links-desktop background-primary ${
            showMobileMenu ? "menu-links" : "menu-links-hidden"
          } `}
        >
          <NavLink
            to="/"
            className="menu-link text-color-primary"
            onClick={() => {setSearchResult([]); setShowMobileMenu(false)}}
          >
            Home
          </NavLink>
          {/* <NavLink to="/recipe" className="menu-link text-color-primary">
            Recipe
          </NavLink> */}
          <NavLink to="/map" className="menu-link text-color-primary" onClick={() => setShowMobileMenu(false)}>
            Around The World
          </NavLink>
          <NavLink to="/" className="menu-link text-color-primary" onClick={() => setShowMobileMenu(false)}>
            About Us
          </NavLink>
        </div>

        <button
        //   href="javascript:void(0);"
          className={`burger `}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <i className={`fa text-color-primary burger-icon ${showMobileMenu? "fa-close": "fa-bars"}`}></i>
        </button>
      </nav>
    </header>
  );
}
