
function barFunc() {
  let links = document.querySelector(".menu-links");
  if (links.style.display === "block") {
      links.style.display = "none";
  } else {
      links.style.display = "block";
  }
}

function Header() {
    return (
      <header>
      <nav className="menu max-width-container">

          <a href="./index.html" className="company-logo"> 
              <i className="fa-solid fa-earth-americas text-color-primary"></i>
          </a>

          <div className="menu-links"> 
              <a href="./index.html" className="text-color-primary">Home</a>
              <a href="./recipe.html" className="text-color-primary">Recipe</a>
              <a href="#recommendations" className="text-color-primary">Recommendations</a>
              <a href="#world" className="text-color-primary">Around the World</a>
              <a href="#about" className="text-color-primary">About Us</a>
          </div>

          <a href="javascript:void(0);" className="icon burger" >
              <i className="fa fa-bars text-color-primary"></i>
          </a>
      </nav>


  </header>

    )
}
export default Header;