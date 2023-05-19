import { useEffect } from "react";
import { useSearchResult } from "../../hooks/useSearchResult";
import { useChosenFilterAmount } from "../../hooks/useChosenFilterAmount";
import Geo from "./Geo";
import Search from "./Search";
import ResultContainer from "./ResultContainer";
import Banner from "../common/Banner";
import Recommendations from "./Recommendations";
import "./indexpage.css";

// start- och söksidan
export default function IndexPage() {
    const data = useSearchResult((state) => state.searchResult);
    const title = useSearchResult((state) => state.title);
    
    //antalet valda filter i filtermenyn
    const clearChosenFilters = useChosenFilterAmount(state => state.clearChosenFilter);

    //rensa chosen filters om användaren lämnar indexpage
    useEffect(() =>{
        return() => {
            clearChosenFilters();
        };
    }, []);

    return (
        <>
            <section className="geosearch flex-center background-secondary max-width-container">
                <Geo />
                <Search />
            </section>
            {data == "" ?
                // om ingen sökning gjorts visas rekommendationer
                <>
                    <Recommendations></Recommendations>
                    <Recommendations></Recommendations>
                    <Banner />
                    <Recommendations></Recommendations>
                    <Recommendations></Recommendations>
                </>
                :
                // data från sökning visas i resultcontainer
                <>
                    <ResultContainer data={data} title={title} isReco={false} />
                </>
            }
            <Banner />
        </>
    )
}
