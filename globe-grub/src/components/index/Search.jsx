import { useState, useEffect } from "react";
import { useRef } from 'react';
import { useSearchResult } from "../../hooks/useSearchResult";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { shallow } from "zustand/shallow";
import FilterMenu from "./FilterMenu";
import * as apiSearchFunctions from "../../modules/apiSearchFunctions";
import { apiKey } from "../../internal_data/apiKey";
import "./search.css";

//komponent för sökrutan
export default function Search() {
    //key som hamnar i url
    // const key = useKey((state) => state.key);
    const key = apiKey;
    //setta sökresultat
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    //Setta sök/filter titel
    const [title, setTitle] = useSearchResult((state) =>
        [state.title, state.setTitle], shallow);
    //ange mängd som ska visas "showmore"
    const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow);

    //strängen i sökrutan (för att visa rensa-knapp om den inte är tom)
    const [searchInput, setSearchInput] = useState("");

    //______________________________Filtermeny_____________________________//
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    //funktion för att kunna skicka data från filtermenyn till searchkomponenten
    //(så man kan öppna/stänga menyn både från search och filtermenu)
    const filterMenuToSearch = (filterData) => {
        setShowFilterMenu(filterData);
    }

    //ref som används för att kunna stänga filtermenyn när användare klickar utanför den
    const ref = useRef(null);
    useEffect(() => {
        const Clickout = (e) => {
            if (!ref.current.contains(e.target)) {
                setShowFilterMenu(false);
            }
        };
        document.addEventListener("mousedown", Clickout);
        return () => {
            document.removeEventListener("mousedown", Clickout);
        };
    });

    //______________________________Event-handlers_____________________________//

    //ClearSearchbar
    const clearSearchBar = () => {
        document.querySelector(".searchbar").value = "";
    }
    //Set searchinput
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }
    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTitle("");
        let fetchedData = await apiSearchFunctions.fetchRecipes(key, null);
        setResultsToShow(8);
        setSearchResult(fetchedData[0]);
        //justerar sök- och filterparametrarna som returneras av fetchRecipes för att
        //sätta titel på sökresultatet
        setTitle(apiSearchFunctions.manipulateTitle(fetchedData[1], fetchedData[2]));
    };

    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="searchbar-container background-primary border-color-primary flex-separate">
                    <input
                        className="searchbar text-color-primary"
                        type="text"
                        name="queryvalue"
                        placeholder="Search..."
                        onChange={handleChange}
                    />
                    <div className="flex button-container">
                        {searchInput != "" ?
                            //knapp med "X" för att rensa sökrutan
                            <button type="button" className="clear-search-btn text-color-primary" onClick={() => clearSearchBar()}>
                                <i className="fa-solid fa-xmark clear-search-icon"></i>
                            </button>
                            :
                            <></>}
                        {/* sökknapp */}
                        <button
                            type="submit"
                            className="search-btn color-primary">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        </button>
                        {/* knapp för att öppna filtermeny */}
                        <button
                            type="button"
                            className="slider-btn color-primary"
                            onClick={() => setShowFilterMenu(!showFilterMenu)}>
                            <i className="fa-solid fa-sliders slider-icon"></i>
                        </button>
                    </div>
                </div>
            </form>
            <FilterMenu filterMenuToSearch={filterMenuToSearch} visible={showFilterMenu} refValue={ref} />
        </>
    )
}