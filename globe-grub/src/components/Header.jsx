import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import Logo from "./Logo";

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

  return (
    <header>
      <nav className="menu max-width-container">
        <NavLink to="/">
          <Logo />
        </NavLink>

        <div
          className={`menu-links-desktop ${
            showMobileMenu ? "" : "menu-links"
          } `}
        >
          <NavLink
            to="/"
            className="text-color-primary"
            onClick={() => setSearchResult([])}
          >
            Home
          </NavLink>
          <NavLink to="/recipe" className="text-color-primary">
            Recipe
          </NavLink>
          <NavLink to="/" className="text-color-primary">
            Around The World
          </NavLink>
          <NavLink to="/" className="text-color-primary">
            About Us
          </NavLink>
        </div>

        <button
          href="javascript:void(0);"
          className="burger"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <i className="fa fa-bars text-color-primary"></i>
        </button>
      </nav>
    </header>
  );
}
