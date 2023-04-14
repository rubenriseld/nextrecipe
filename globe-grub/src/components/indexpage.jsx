import Geo from "./geo"
import Search from "./search"
import ResultContainer from "./resultcontainer"
import Ad from "./ad"

export default function IndexPage(){
    return(
        <>
            <section className="geosearch flex-center background-secondary max-width-container">
                <Geo></Geo>
                <Search></Search>
            </section>
            <ResultContainer title="Hej, detta är ditt resultat:"/>
            <Ad/>
            <ResultContainer title="Hej, detta är ditt resultat 2:"/>
            <Ad/>
        </>
    )
}