import Geo from "./Geo"
import Search from "./Search"
import ResultContainer from "./ResultContainer"
import Ad from "./Ad"

import React, {useState} from "react"

export default function IndexPage(){

    // bara hårdkodade titlar i default-datan här än så länge
    // men man kanske får göra typ nåt api-anrop här sen när 
    // vi ska kirra en sån där slumpad automatisk blablabla

    const [data, setData] = useState(["Mediterranean", "Scandinavian"]);

    //funktionen för att sätta data till det som skickats hit
    //från Search-komponenten
    const childToParent = (childData) => {
        setData(childData);
    }

    return(
        <>
        
            <section className="geosearch flex-center background-secondary max-width-container">
                <Geo></Geo>

                {/* funktionen slängs in som ett attribut på Search-komponenten
                så den finns tillgänlig där */}

                <Search childToParent={childToParent}></Search>
            </section>
            <Ad/>
{/* 
            kört på en map här ba ifall vi skulle ha fler än 1 slumpade 
            "rekommendationer" på startsidan

            bör ju då få in data som en prop som sen kan användas för å
            fixa massa RecipeCards inne i ResultContainer-komponenten typ */}

            {data.map(x =>{
                return(
                    <ResultContainer title={x}/>
                )
            })}
            <Ad/>
        </>
    )
}
