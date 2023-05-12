import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import Logo from "./Logo";
import Map from "./Map";

// komponent för headern som syns på alla sidor
export default function Header() {
    // bool för att visa/stänga mobilmenyn
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [SearchResult, setSearchResult] = useSearchResult(
        (state) => [state.SearchResult, state.setSearchResult],
        shallow
    );

    // bool för att toggla så headern hamnar högst upp på skärmen
    // när användaren scrollar uppåt
    const [sticky, setSticky] = useState(false);
    // senaste scrollposition
    let lastScroll = 0;

    // funktion för att göra headern sticky beroende på scrollposition
    const toggleStickyHeader = () => {
        window.addEventListener('scroll', () => {
            // currentScroll är användarens position i Y-led, från toppen av dokumentet 
            const currentScroll = window.scrollY;
            if (currentScroll <= 0) {
                setSticky(false);
                return;
            }
            if (currentScroll > lastScroll) {
                setSticky(false);
            } else if (currentScroll < lastScroll) {
                setSticky(true);
            }
            lastScroll = currentScroll;
        })
    }

    // ser till så att sidan hela tiden håller koll på scrollevent
    useEffect(() => {
        const handleScrollEvent = () => {
            toggleStickyHeader();
        }
        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.addEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <header className={`background-primary ${sticky ? "header-sticky" : ""} ${showMobileMenu ? "header-fixed" : ""}`}>
            <nav className="menu max-width-container background-primary">
                <NavLink className="logo-link" to="/" onClick={() => { setSearchResult([]); setShowMobileMenu(false); }}>
                    <Logo sloganVisible={false} />
                </NavLink>
                <div
                    className={`menu-links-desktop background-primary ${showMobileMenu ? "menu-links" : "menu-links-hidden"} `}>
                    <NavLink to="/"
                        className="menu-link text-color-primary"
                        onClick={() => { setSearchResult([]); setShowMobileMenu(false) }}>Home
                    </NavLink>
                    <NavLink to="/map" 
                        className="menu-link text-color-primary" 
                        onClick={() => setShowMobileMenu(false)}>Around The World
                    </NavLink>
                    <NavLink to="/" 
                        className="menu-link text-color-primary" 
                        onClick={() => setShowMobileMenu(false)}>About Us
                    </NavLink>
                </div>
                <button
                    className={`burger `}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    <i className={`fa text-color-primary burger-icon ${showMobileMenu ? "fa-close" : "fa-bars"}`}></i>
                </button>
            </nav>
        </header>
    );
}