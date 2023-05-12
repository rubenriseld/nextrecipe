import { useState, useEffect } from "react";
import { useFilterStore } from "../hooks/useFilterStore"; //Används för url-parameter i fetch mot API
import { useSearchResult } from "../hooks/useSearchResult"; // fetchresult sparas i hook
import { useTag } from "../hooks/useTag"; // 
import { useRef } from 'react';
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems"; //Arrayer med filter-parameter
import { shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton"; //komponent filterbutton (tags i recipepage)

import { useKey } from "../hooks/useKey"; //API keys, global state
import { useResultsToShow } from "../hooks/useResultsToShow"; //antal recept som ska visas innan "show more" knappen klickas


// komponent för sökning, hantering av taggar samt filtermeny och filtrering
export default function Search() {

    //Hämta api key 
    const key = useKey((state) => state.key);

    //show-more-grej
    const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow);

    //______________________________FilterMeny_____________________________//
    //filter-param "&cuisines"...etc hämtas
    const state = useFilterStore.getState((state) => state);
    //visar/döljer filtermeny
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    //visar/döljer olika filterkategorier (dropdown) i filtermny
    const [cuisineCollapsed, setCuisineCollapsed] = useState(true);
    const [dietCollapsed, setDietCollapsed] = useState(true);
    const [intoleranceCollapsed, setIntoleranceCollapsed] = useState(true);
    const [timeCollapsed, setTimeCollapsed] = useState(true);
    const [mealCollapsed, setMealCollapsed] = useState(true);

    //close filter menu when clicking outside
    const ref = useRef(null);

    //
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


    //______________________________Sökning, searchbar_____________________________//
    //Input från searchbar
    const [searchInput, setSearchInput] = useState("");
    //Resultat från sökning hamnar i indexpage
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    //söktermen från searchInput, hamnar i indexpage
    const [title, setTitle] = useSearchResult((state) =>
        [state.title, state.setTitle], shallow);
    let searchString = "";
    //_____________________________________________________________________________//


    //_________________________________Taggsökning_________________________________//
    const [tag, setTag] = useTag(
        (state) => [state.tag, state.setTag], shallow);
    //Hämtar vald tagg, om värde finns kör useEffect som anropar filterUrl
    const tagg = useTag.getState((state) => state.tag);
    //gör en sökning på taggklick från recipepage om det klickats
    useEffect(() => {
        if (tagg.tag != "") {
            filterUrl(tagg.tag);
        }
        console.log("tagg: " + tagg.tag);
    }, []);


    //_____________________________________________________________________________//
    //_________________________________API Anrop__________________________________//

    //funktion för att manipulera strängen med filter parametrar som kommer genom taggsökning/filtermenyn som visas som titel
    //tar bort "&[filterparam]=" så att endast termerna är kvar i strängen
    //tar sedan bort ',' ifall det är flera av samma filterkategori (&cuisines=nordic--->,<--african)
    //kollar om termen slutar på "0" eller "5" för att se om termen är för tid, och lägger till "Under [term] minutes" om 
    //om sökterm från sökbar finns, läggs det till först i strängen först, sedan läggs resterande termer till med stor bokstav i början på varje term
    //färdig sträng skickas tillbaka till setTitle() i filterUrl funktionen
    const manipulateTitle = (searchStrings) => {

        console.log(searchStrings);
        let splitParam = searchStrings.split('&');
        let filterGroups = [];
        splitParam.forEach(filter => {
            let temp = filter.split('=')
            filterGroups.push(temp[1]);
        })

        let filterValues = []
        filterGroups.forEach(filter => {
            try {
                filterValues.push(filter.split(','));
            }
            catch {
                filterValues.push(filter);
            }
        })
        console.log(filterValues);

        let tagTitle = "";
        if (searchInput != "") {
            tagTitle += searchInput;
        }
        const fixMealType = (str) => {
            if (str == "appetizers") {
                return ("lunch")
            }
            if (str == "main course") {
                return ("dinner")
            }
        }
        filterValues.forEach(filter => {

            if (Array.isArray(filter)) {
                filter.forEach(x => {
                    if (tagTitle == "") {

                        if (x.charAt(1) == 0 || x.charAt(1) == 5) {
                            tagTitle += "Under " + x + " min"
                        }
                        else {
                            if (x == "appetizers" || x == "main course") {
                                let fixedTag = fixMealType(x);
                                tagTitle += fixedTag.charAt(0).toUpperCase() + fixedTag.slice(1).toLowerCase()
                            }
                            else {
                                tagTitle += x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
                            }

                        }
                    }
                    else if (tagTitle != "") {
                        if (x.charAt(1) == 0 || x.charAt(1) == 5) {
                            tagTitle += ", Under " + x + " min"
                        }
                        else {
                            if (x == "appetizer" || x == "main course") {
                                let fixedTag = fixMealType(x);
                                tagTitle += ", " + fixedTag.charAt(0).toUpperCase() + fixedTag.slice(1).toLowerCase()
                            } else {

                                tagTitle += ", " + x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
                            }
                        }
                    }
                })
            }
        })
        return tagTitle;
    }

    //funktion som anropar API med sökord från sökbar och eller filter

    const filterUrl = async (searchString) => {
        try {
            setTitle("")
            const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${searchString}&number=32`;
            console.log(key);
            const response = await fetch(url);
            console.log(url);
            const result = await response.json();
            //om sökbar inte är tom och det finns resultat
            //om filter är angivet, manipulera filter & sökbar inputs
            //annars skicka endast med searchbar input 
            if (searchInput != "" & result.results.length != 0) {
                if (searchString != "") {
                    setTitle(manipulateTitle(searchString));
                }
                else {
                    setTitle(searchInput);
                }
                setSearchResult(result.results)

            }
            //om searchbar är tom och results är tom, ge searchresult värdet av "empty" som används för att visa felmeddelanden i resultcontainer
            if (searchInput == "" || result.results.length == 0) {
                setSearchResult("empty");
                setTitle(searchInput)
            }
            //om endast filter är angivna, manipulera termer och setta result
            if (searchInput == "" && searchString != "") {
                setTitle(manipulateTitle(searchString));
                setSearchResult(result.results)
            }
        } catch (e) {
            console.log(e);
        }
        //töm tagg
        setTag("");
        //"nollställ" hur många recept som ska visas (ökar för varje klickning på "show more")
        setResultsToShow(8);

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
        //hämtar värdet på alla aktiva filterknappar
        //jämför filterknappens värde "type" och placerar värde i rätt sträng (så att alla termer hamnar i rätt parameter)
        //spara alla färdiga url parametrar och anropa filterUrl för att fetcha
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
                        <button type="button" className="collapse-btn flex flex-separate background-primary" onClick={() => setCuisineCollapsed(!cuisineCollapsed) }>
                            <p className="filter-title text-color-primary">Cuisine</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${cuisineCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`cuisine-filter ${cuisineCollapsed ? "filter-show" : ""}`}>
                            {CuisineFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}</div>

                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => setDietCollapsed(!dietCollapsed) }>
                            <p className="filter-title text-color-primary">Diet</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${dietCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`diet-filter ${dietCollapsed ? "filter-show" : ""}`}>
                            {DietFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => setIntoleranceCollapsed(!intoleranceCollapsed) }>
                            <p className="filter-title text-color-primary">Intolerance</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${intoleranceCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`intolerance-filter ${intoleranceCollapsed ? "filter-show" : ""}`}>
                            {IntoleranceFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => setTimeCollapsed(!timeCollapsed)}>
                            <p className="filter-title text-color-primary">Time</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${timeCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`time-filter ${timeCollapsed ? "filter-show" : ""}`}>
                            {TimeFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => setMealCollapsed(!mealCollapsed)}>
                            <p className="filter-title text-color-primary">Meal</p>
                            <i className={`fa-solid collapse-icon text-color-primary ${mealCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`meal-filter ${mealCollapsed ? "filter-show" : ""}`} >
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
}