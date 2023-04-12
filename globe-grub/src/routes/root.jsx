import Header from "../components/header"
import Footer from "../components/footer"
import Ad from "../components/ad"
import Result from "../components/resultcontainer"



export default function Root() {
    return(
        <>
        <Header/>

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
        <Result title="Hej, detta är ditt resultat:"/>
        <Ad/>
        <Result title="Hej, detta är ditt resultat 2:"/>
        <Footer/>
        </>
    )
}