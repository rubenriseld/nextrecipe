import Geo from "./Geo"
import Search from "./Search"
import ResultContainer from "./ResultContainer"
import Ad from "./Ad"

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