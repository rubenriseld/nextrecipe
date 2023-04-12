

function barFunc() {
    let links = document.querySelector(".menu-links");
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
}


export default function Root() {
    return(
        <>
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

            <a href="javascript:void(0);" className="icon burger" onclick="barFunc()">
                <i className="fa fa-bars text-color-primary"></i>
            </a>
        </nav>


    </header>

    <section className="geosearch flex-center background-secondary max-width-container">

        <div className="geo-container">
            <button type="button" className="geo-btn color-accent">
                <i className="fa-solid fa-location-dot geo-icon"></i>
            </button>
            <p className="geo-text">Find Recipes matching your region!</p>
        </div>

        <div className="searchbar-container color-secondary">
            <input className="searchbar" type="search" name="queryvalue" value="search.." />
            <button type="button" className="search-btn color-primary">

                <i className="fa-solid fa-sliders slider-icon"></i>

            </button>
        </div>
    </section>

    <section className="result-container max-width-container">
        
        <section className="ad">
            <h1>Annons</h1>
        </section>

        <h1>Recept 1</h1>
        <section className="recipe-card-container">

            <article className="recipe-card">
                <img src="img/chickckckcn.png" alt="Image"/>

                <div className="recipe-card-info">
                    <h3 className="recipe-card-title">hejhej</h3>
                    <div>
                        <div className="flex">
                            <p className="tag color-secondary">20 min</p> 
                            <p className="tag color-secondary">asia</p>
                            <p className="tag color-secondary">vegan</p>

                        </div>
                        <div className="flex">
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9734;</p>
                        </div>
                        <p className="card-text">Casasfasfs</p>
                    </div>
                </div>
            </article>
       
                        <article className="recipe-card">
                            <img src="img/chickckckcn.png" alt="Image"/>

                            <div className="recipe-card-info">
                                <h3 className="recipe-card-title">hejhej</h3>
                                <div>
                                    <div className="flex">
                                        <p className="tag color-secondary">20 min</p>
                                        <p className="tag color-secondary">asia</p>
                                        <p className="tag color-secondary">vegan</p>
                                    </div>
                                    <div className="flex">
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9734;</p>
                                    </div>
                                    <p className="card-text">Casasfasfs</p>
                                </div>
                            </div>
                        </article>

                        <article className="recipe-card">
                            <img src="img/chickckckcn.png" alt="Image"/>

                            <div className="recipe-card-info">
                                <h3 className="recipe-card-title">hejhej</h3>
                                <div>
                                    <div className="flex">
                                        <p className="tag color-secondary">20 min</p>
                                        <p className="tag color-secondary">asia</p>
                                        <p className="tag color-secondary">vegan</p>
                                    </div>
                                    <div className="flex">
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9734;</p>
                                    </div>
                                    <p className="card-text">Casasfasfs</p>
                                </div>
                            </div>
                        </article>
                        
                        <article className="recipe-card">
                            <img src="img/chickckckcn.png" alt="Image"/>

                            <div className="recipe-card-info">
                                <h3 className="recipe-card-title">hejhej</h3>
                                <div>
                                    <div className="flex">
                                        <p className="tag color-secondary">20 min</p>
                                        <p className="tag color-secondary">asia</p>
                                        <p className="tag color-secondary">vegan</p>
                                    </div>
                                    <div className="flex">
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9733;</p>
                                        <p className="star text-color-secondary">&#9734;</p>
                                    </div>
                                    <p className="card-text">Casasfasfs</p>
                                </div>
                            </div>
                        </article>
            
            
        </section>
        

        <section className="ad">
            <h1>Annons</h1>
        </section>

        
        <h1>Recept 1</h1>
        <section className="recipe-card-container">
            <article className="recipe-card">
                <img src="img/chickckckcn.png" alt="Image"/>

                <div className="recipe-card-info">
                    <h3 className="recipe-card-title">hejhej</h3>
                    <div>
                        <div className="flex">
                            <p className="tag color-secondary">20 min</p>
                            <p className="tag color-secondary">asia</p>
                            <p className="tag color-secondary">vegan</p>
                        </div>
                        <div className="flex">
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9734;</p>
                        </div>
                        <p className="card-text">Casasfasfs</p>
                    </div>
                </div>
            </article>


            <article className="recipe-card">
                <img src="img/chickckckcn.png" alt="Image"/>

                <div className="recipe-card-info">
                    <h3 className="recipe-card-title">hejhej</h3>
                    <div>
                        <div className="flex">
                            <p className="tag color-secondary">20 min</p>
                            <p className="tag color-secondary">asia</p>
                            <p className="tag color-secondary">vegan</p>
                        </div>
                        <div className="flex">
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9734;</p>
                        </div>
                        <p className="card-text">Casasfasfs</p>
                    </div>
                </div>
            </article>

            <article className="recipe-card">
                <img src="img/chickckckcn.png" alt="Image"/>

                <div className="recipe-card-info">
                    <h3 className="recipe-card-title">hejhej</h3>
                    <div>
                        <div className="flex">
                            <p className="tag color-secondary">20 min</p>
                            <p className="tag color-secondary">asia</p>
                            <p className="tag color-secondary">vegan</p>
                        </div>
                        <div className="flex">
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9734;</p>
                        </div>
                        <p className="card-text">Casasfasfs</p>
                    </div>
                </div>
            </article>
            
            <article className="recipe-card">
                <img src="img/chickckckcn.png" alt="Image"/>

                <div className="recipe-card-info">
                    <h3 className="recipe-card-title">hejhej</h3>
                    <div>
                        <div className="flex">
                            <p className="tag color-secondary">20 min</p>
                            <p className="tag color-secondary">asia</p>
                            <p className="tag color-secondary">vegan</p>
                        </div>
                        <div className="flex">
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9733;</p>
                            <p className="star text-color-secondary">&#9734;</p>
                        </div>
                        <p className="card-text">Casasfasfs</p>
                    </div>
                </div>
            </article>

        </section>
    </section>

    <footer>
        <div className="max-width-container flex flex-separate">
            <section className="flex-left">

                <h2 className="company-name text-color-primary">GLOBE GRUB</h2>
                <p className="slogan text-color-primary">slogan</p>

            </section>
            <section className="flex-right footer-info-section">
                <p>info</p>
                <p>info</p>
                <p>info</p>
            </section>
        </div>
    </footer>
        </>
    )
}