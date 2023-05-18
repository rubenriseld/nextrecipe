import Geo from "./Geo";
import Search from "./Search";
import ResultContainer from "./ResultContainer";
import Banner from "../common/Banner";
import { Recommendations } from "./Recommendations";
import { useSearchResult } from "../../hooks/useSearchResult";
import { useEffect } from "react";
import { useChosenFilterAmount } from "../../hooks/useChosenFilterAmount";

// start- och söksidan
export default function IndexPage() {
    const data = useSearchResult((state) => state.searchResult);
    const title = useSearchResult((state) => state.title);
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
                <>
                    <Recommendations></Recommendations>
                    <Recommendations></Recommendations>
                    <Banner />
                    <Recommendations></Recommendations>
                    <Recommendations></Recommendations>
                </>
                :
                <>
                    <ResultContainer data={data} title={title} isReco={false} /> {/*data från Search.jsx(data från sökningen) hamnar i resultcontainer */}
                </>
            }
            <Ad />
        </>
    )
}
