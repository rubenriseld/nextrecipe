

function Header() {
    return (
        <header class="mobile-container color-brand">                 
              <nav class="topnav max-width-container">                
                  <a href="/" class="company-logo nav-btn">
                    <i class="fa-solid fa-earth-americas text-color-interact"></i>
                  </a>
                  
                  <div id="menuLinks">  {/*Nedan är menyval plus länkar i hamburgermenyn*/}
                      <a href="/recipe.html" class="text-color-interact nav-btn">Recipe</a>
                      <a href="#recommendations" class="text-color-interact nav-btn">Recommendations</a>
                      <a href="#world" class="text-color-interact nav-btn">Around the World</a> 
                      <a href="#about" class="text-color-interact nav-btn">About Us</a>
                  </div>
                  <a href="javascript:void(0);" class="icon nav-btn burger" onclick="barFunc()">
                    <i class="fa fa-bars text-color-interact"></i>
                  </a>
              </nav>           
      </header>

    )
}
export default Header;