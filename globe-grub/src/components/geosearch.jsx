import Geo from "./geo"
import Search from "./search"
export default function GeoSearch(){
    return(
        <section className="geosearch flex-center background-secondary max-width-container">
            <Geo></Geo>
            <Search></Search>
        </section>
    )
}