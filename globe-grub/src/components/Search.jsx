
import { useState, useEffect } from "react";
// import { useSearchParameters } from "../hooks/useSearchParameters";
import { useRef } from 'react';
import { shallow } from "zustand/shallow";
import { useKey } from "../hooks/useKey";
import { useSearchResult } from "../hooks/useSearchResult";
import { useResultsToShow } from "../hooks/useResultsToShow";
import FilterMenu  from "./FilterMenu";
import * as apiSearchFunctions from "../modules/apiSearchFunctions";

export default function Search() {
    
    //importerade funktioner
    
    // const manipulateTitle = apiSearchFunctions.manipulateTitle();

    //key som hamnar i url
    const key = useKey((state) => state.key); 
    //setta sökresultat
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    //Setta sök/filter titel
    const [title, setTitle] = useSearchResult((state) =>
        [state.title, state.setTitle],shallow);
    //ange mängd som ska visas "showmore"
    const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow); 
    

    const [searchInput, setSearchInput] = useState("");

//______________________________Filtermeny_____________________________//
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const childToParent = (childData) =>{
        setShowFilterMenu(childData);
    }

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
        // setInputParameter("");
    }
    //Set searchinput
    const handleChange = (e) => {     
        e.preventDefault();
        
        setSearchInput(e.target.value);
        // console.log(inputParameter)
    }
    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTitle("");
        let fetchedData = await apiSearchFunctions.fetchRecipes(key, null);
        console.log("search:");
        console.log(fetchedData[0]);
        setResultsToShow(8);
        setSearchResult(fetchedData[0]);
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
                            <button type="button" className="clear-search-btn" onClick={() => clearSearchBar()}>
                                <i className="fa-solid fa-xmark clear-search-icon text-color-primary"></i>
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
            
            <FilterMenu childToParent={childToParent} visible={showFilterMenu} refValue={ref}/> 
        </>
    )
}