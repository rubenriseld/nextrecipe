import Header from "../components/header"
import Footer from "../components/footer"
import Ad from "../components/ad"
import Result from "../components/resultcontainer"
import GeoSearch from "../components/geosearch"



export default function Root() {
    return(
        <>
        <Header/>
        <GeoSearch/>

            {/* resultatdel */}
            <Result title="Hej, detta är ditt resultat:"/>
            <Ad/>
            <Result title="Hej, detta är ditt resultat 2:"/>
            <Ad/>

            {/* receptsida */}

        <Footer/>
        </>
    )
}