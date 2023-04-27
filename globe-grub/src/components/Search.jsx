import { useState, useEffect } from "react";

import { useFilterStore } from "../hooks/useFilterStore";
import { useSearchResult } from "../hooks/useSearchResult";
import { useTag } from "../hooks/useTag";

import { useRef } from 'react';
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems";
import { shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton";

export default function Search() {
    // search string
    const [searchInput, setSearchInput] = useState("");
    // const [searchInputArray, setSearchInputArray] = useState([]);
    let searchString = "";
    //search store for sending to indexpage
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    


        //för att göra sökning när man klickat på en tagg
        const [tag, setTag] = useTag(
            (state) => [state.tag, state.setTag],
            shallow
        );
        // setTag("hej");


        useEffect(() => {
        // searchString = ;
        // if(tag == null ||){ 
        // } 
        filterUrl(tag);
        console.log(tag);
        }, []);
 

        const key1 = "13c6c14454a748769e3611a7cf719862";
        const key2 = "74c179cdd6bf42fab75869c258580b05";
        const key3 = "c02162ede9394dd8bca983829213bd71";
        const key4 = "85ce5287879e42978484fcf300dace17";
        const key5 = "8fbd9413e79a49bfaa909d68f22e0476";
        const key6 = "ce46b5aef3da4d67b273b1b7dec8567f";
        const key7 = "15c980413ad44f09ba2ac7e73f076610";
        const key8 = "e50fb6304553492781cba43da8b4bc7f"; 

    
        //store for filter terms
    const state = useFilterStore.getState((state) => state);

    // filter menu stuff
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
    }, []);

    const Clickout = (e) => {
        if (showFilterMenu && !ref.current.contains(e.target)) {
            setShowFilterMenu(false);
        }
    };

    const filterUrl = async (searchString) => {
        try {
            const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key6}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${searchString}`;
            console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            setSearchResult(result.results);
            console.log(result)
            // setTag("");

            //result.results är en lista av alla recept, dessa skickas in i childtoparent    
        } catch (e) {
            console.log(e);
        }
    };

    const inactivateButtons = () => {
        let buttons = document.querySelectorAll('.active-btn');
        buttons.forEach(btn => {
            btn.click();
        })
    }

    const getActiveButtons = async () => {
        // let searchString = "";

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

    const clearSearchBar = () => {
        document.querySelector(".searchbar").value = "";
        setSearchInput("");
    }
    const handleChange = (e) => {
        //måste kirra så searchinput lagras medan man skriver nå nytt
        setSearchInput(e.target.value);

        // document.querySelector(".searchbar").value = e.target.value;


    }
    // const saveSearch = () => {
    //     //pusha sökordet till arrayen
    //     setSearchInputArray(searchInputArray => [...searchInputArray, searchInput]);
    //     searchInputArray.forEach(searchTag => {
    //         searchString += searchTag+",";//wtf

    //     });
    //     console.log("save search: "+searchString);
    //     // handleSubmit();
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                <div className="searchbar-container color-secondary flex-separate">
                    {/* {searchInputArray.map(x => {
                        return(
                            <button type="button" onClick={()=>removeSearchTag(x)}>{x}</button>
                        );
                    })} */}
                    <input
                        className="searchbar"
                        type="text"
                        name="queryvalue"
                        placeholder="search.."
                        onChange={handleChange}
                    />
                    <div className="flex">

                        {searchInput != "" ?

                            //knapp med "X" för att rensa sökrutan
                            <button type="button" className="clear-search-btn" onClick={() => clearSearchBar()}>

                                <i class="fa-solid fa-xmark clear-search-icon"></i>
                            </button>
                            :
                            <></>}

                        <button
                            type="submit"
                            className="search-btn color-primary"
                        >
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        </button>
                        <button
                            type="button"
                            className="slider-btn color-primary" 
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                        >
                            <i className="fa-solid fa-sliders slider-icon"></i>
                        </button>
                    </div>

                </div>
                {/* {searchInput!= "" ?
                //knapp för att söka med sökrutans sökord i sig
                <button type="submit" className="search-field background-primary" onClick={()=> saveSearch()}>
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    {document.querySelector(".searchbar").value}
                </button>:
                <></> */}

            </form>

            {/* tillfällig div med för filtreringen */}

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