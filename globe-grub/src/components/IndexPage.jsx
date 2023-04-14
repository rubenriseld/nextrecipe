import Geo from "./Geo"
import Search from "./Search"
import ResultContainer from "./ResultContainer"
import Ad from "./Ad"

import React, {useState} from "react"

export default function IndexPage(){
    const [data, setData] = useState(["Mediterranean", "Scandinavian"]);
    const childToParent = (childData) => {
        setData(childData);
    }
    
    return(
        <>
        
            <section className="geosearch flex-center background-secondary max-width-container">
                <Geo></Geo>
                <Search childToParent={childToParent}></Search>
            </section>
            <Ad/>
            {data.map(x =>{
                return(
                    <ResultContainer title={x}/>
                )
            })}
            <Ad/>
            {/* <ResultContainer title="Hej, detta är ditt resultat:"/>
            <Ad/>
            <ResultContainer title="Hej, detta är ditt resultat 2:"/>
            <Ad/> */}
        </>
    )
}
