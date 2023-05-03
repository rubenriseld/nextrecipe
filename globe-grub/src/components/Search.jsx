import { useState, useEffect } from "react";
import { useFilterStore } from "../hooks/useFilterStore";
import { useSearchResult } from "../hooks/useSearchResult";
import { useTag } from "../hooks/useTag";
import { useRef } from 'react';
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems";
import { shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton";

import { useKey } from "../hooks/useKey";
import { useResultsToShow } from "../hooks/useResultsToShow";

export default function Search() {
//ändra key i useKey-hooken
const key = useKey((state) => state.key);

//show-more-grej
const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow);
    
//______________________________FilterMeny_____________________________//
    const state = useFilterStore.getState((state) => state);
    
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [cuisineCollapsed, setCuisineCollapsed] = useState(true);
    const [dietCollapsed, setDietCollapsed] = useState(true);
    const [intoleranceCollapsed, setIntoleranceCollapsed] = useState(true);
    const [timeCollapsed, setTimeCollapsed] = useState(true);
    const [mealCollapsed, setMealCollapsed] = useState(true);
    const [showCuisineFilter, setShowCuisineFilter] = useState(false);
    const [showDietFilter, setShowDietFilter] = useState(false);
    const [showIntoleranceFilter, setShowIntoleranceFilter] = useState(false);
    const [showTimeFilter, setShowTimeFilter] = useState(false);
    const [showMealFilter, setShowMealFilter] = useState(false);
    //close filter menu when clicking outsie
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", Clickout);
        return () => {
            document.removeEventListener("mousedown", Clickout);
        };
    }, [ref]);

    const Clickout = (e) => {
        if (showFilterMenu && !ref.current.contains(e.target)) {
            setShowFilterMenu(false);
        }
    };
//_____________________________________________________________________________//

//______________________________Sökning, searchbar_____________________________//
    //Input från searchbar
    const [searchInput, setSearchInput] = useState("");
    //Resultat från sökning hamnar i indexpage
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    //söktermen från searchInput, hamnar i indexpage
    const [title, setTitle]= useSearchResult((state)=>
        [state.title, state.setTitle],shallow);
    let searchString = "";
//_____________________________________________________________________________//

    
//_________________________________Taggsökning_________________________________//
    const [tag, setTag] = useTag(
        (state) => [state.tag, state.setTag],shallow);
    //Hämtar vald tagg, om värde finns kör useEffect som anropar filterUrl
    const tagg = useTag.getState((state)=> state.tag);
    if(tagg.tag != ""){
        useEffect(() => {       
        filterUrl(tagg.tag);
        console.log("tagg: "+ tagg.tag);
        }, []);
    }
//_____________________________________________________________________________//

    const filterUrl = async (searchString) => {
        try {
            setTitle("")
            const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${searchString}&number=8`;
            const response = await fetch(url);
            console.log(url);
            const result = await response.json();
            if(searchInput != "" & result.results.length != 0){
                setSearchResult(result.results)
                setTitle(searchInput)
            }
            if(searchInput == "" || result.results.length == 0){
                setSearchResult("empty");
                setTitle(searchInput)
            }
            if(searchInput =="" && searchString != ""){
                setSearchResult(result.results)
                setTitle(searchString)
            }
            console.log(title)
            console.log(searchResult.length)
            // setTag("");
            
            //result.results är en lista av alla recept, dessa skickas in i childtoparent    
        } catch (e) {
            console.log(e);
        }
    };

//______________________________Event-handlers_____________________________//
    
    //Clear Filters
    const inactivateButtons = () => {
        let buttons = document.querySelectorAll('.active-btn');
        buttons.forEach(btn => {
            btn.click();
        })
    }

    //Apply Filters
    const getActiveButtons = async () => {
        let searchString = "";
        let buttons = document.querySelectorAll('.active-btn');
        // let buttons = activeButtons;
        console.log(buttons)
        let cuisineString = "";
        let dietString = "";
        let mealtypeString = "";
        let intoleranceString = "";
        let timeString = "";
        buttons.forEach(btn => {   
            if (btn.dataset.type == "C" & cuisineString == "") {
                cuisineString += state.cuisine + btn.value
            } else if (btn.dataset.type == "C" & cuisineString != "") {
                cuisineString += "," + btn.value
            }
            else if (btn.dataset.type == "D" & dietString == "") {
                dietString += state.diet + btn.value
            } else if (btn.dataset.type == "D" & dietString != "") {
                dietString += "," + btn.value
            }

            else if (btn.dataset.type == "M" & mealtypeString == "") {
                mealtypeString += state.type + btn.value
            } else if (btn.dataset.type == "M" & mealtypeString != "") {
                mealtypeString += "," + btn.value
            }

            else if (btn.dataset.type == "I" & intoleranceString == "") {
                intoleranceString += state.intolerances + btn.value
            } else if (btn.dataset.type == "I" & intoleranceString != "") {
                intoleranceString += "," + btn.value
            }

            else if (btn.dataset.type == "T" & timeString == "") {
                timeString += state.maxReadyTime + btn.value
            } else if (btn.dataset.type == "T" & timeString != "") {
                timeString += "," + btn.value
            }

        });
        searchString = `${dietString}${cuisineString}${mealtypeString}${intoleranceString}${timeString}`;
        console.log(searchString);
        await filterUrl(searchString);
    }

    //ClearSearchbar
    const clearSearchBar = () => {
        document.querySelector(".searchbar").value = "";
        setSearchInput("");
    }

    //Set searchinput
    const handleChange = (e) => {     
        setSearchInput(e.target.value);
    }

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResultsToShow(4);
        if (searchString != "") {
            console.log(searchString);
            await filterUrl(searchString);

        } else {
            await filterUrl("");
        }
    };


    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="searchbar-container background-primary border-color-primary flex-separate">
                    {/* {searchInputArray.map(x => {
                        return(
                            <button type="button" onClick={()=>removeSearchTag(x)}>{x}</button>
                        );
                    })} */}
                    <input
                        className="searchbar text-color-primary"
                        type="text"
                        name="queryvalue"
                        placeholder="search.."
                        onChange={handleChange}
                    />
                    <div className="flex button-container">

                        {searchInput != "" ?
                            //knapp med "X" för att rensa sökrutan
                            <button type="button" className="clear-search-btn" onClick={() => clearSearchBar()}>

                                <i class="fa-solid fa-xmark clear-search-icon text-color-primary"></i>
                            </button>
                            :
                            <></>}
                        <button
                            type="submit"
                            className="search-btn color-primary">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        </button>
                        <button
                            type="button"
                            className="slider-btn color-primary" 
                            onClick={() => setShowFilterMenu(!showFilterMenu)}>
                            <i className="fa-solid fa-sliders slider-icon"></i>
                        </button>
                    </div>

                </div>
            </form>
            <div className={`filter-menu background-primary ${showFilterMenu ? "" : "filter-show"} `} ref={ref}>
                <div className="menu-header flex flex-separate text-color-primary">
                    <h2 className="filter-menu-title">Filter</h2>
                    <button className="close-filter background-primary" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                        <i className="fa-solid fa-xmark text-color-primary close-filter-icon"></i>
                    </button>
                </div>
                <hr className="filter-line"></hr>
                <div className="menu-body">
                    <div className="filter-container">
                        <button type="button" className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowCuisineFilter(!showCuisineFilter); setCuisineCollapsed(!cuisineCollapsed) }}>
                            <p className="filter-title text-color-primary">Cuisine</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${cuisineCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`cuisine-filter ${showCuisineFilter ? "" : "filter-show"}`}>
                            {CuisineFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}</div>

                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowDietFilter(!showDietFilter); setDietCollapsed(!dietCollapsed) }}>
                            <p className="filter-title text-color-primary">Diet</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${dietCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`diet-filter ${showDietFilter ? "" : "filter-show"}`}>
                            {DietFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowIntoleranceFilter(!showIntoleranceFilter); setIntoleranceCollapsed(!intoleranceCollapsed) }}>
                            <p className="filter-title text-color-primary">Intolerance</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${intoleranceCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`intolerance-filter ${showIntoleranceFilter ? "" : "filter-show"}`}>
                            {IntoleranceFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowTimeFilter(!showTimeFilter); setTimeCollapsed(!timeCollapsed) }}>
                            <p className="filter-title text-color-primary">Time</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${timeCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`time-filter ${showTimeFilter ? "" : "filter-show"}`}>
                            {TimeFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowMealFilter(!showMealFilter); setMealCollapsed(!mealCollapsed) }}>
                            <p className="filter-title text-color-primary">Meal</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${mealCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`meal-filter ${showMealFilter ? "" : "filter-show"}`} >
                            {MealTypeFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="filter-footer">
                    <button className="clear-filter-btn text-color-primary" onClick={() => inactivateButtons()}>Clear Filters</button>

                    <button className="apply-filter-btn color-primary text-color-light" onClick={() => { getActiveButtons(); setShowFilterMenu() }}>Apply Filters</button>
                </div>
            </div>
        </>
    )
    
};