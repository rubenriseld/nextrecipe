import ResultContainer from "./resultcontainer"
import Ad from "./ad"
export default function IndexPage(){
    return(
        <>
        {/* <section className="result-container max-width-container"> */}
            {/*Main page component, showing all recipes and search result*/}
            <ResultContainer title="Hej, detta är ditt resultat:"/>
            <Ad/>
            <ResultContainer title="Hej, detta är ditt resultat 2:"/>
            <Ad/>

        {/* </section> */}
        </>

    )
}