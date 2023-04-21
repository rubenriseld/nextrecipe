import { useState } from "react";
import { useFilterStore } from "../hooks/FilterMenu";
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton";

export default function Search() {
    // search string
    const [searchInput, setSearchInput] = useState("");

    //search store for sending to indexpage
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);

    //store for filter terms
    const state = useFilterStore.getState((state) => state);
    const [searchString, setSearchString] = useState("");

    const key1 = "13c6c14454a748769e3611a7cf719862";
    const key2 = "74c179cdd6bf42fab75869c258580b05";
    const key3 = "c02162ede9394dd8bca983829213bd71";
    const key4 = "85ce5287879e42978484fcf300dace17";
    const key5 = "8fbd9413e79a49bfaa909d68f22e0476";

    // const [showFilterMenu, setShowFilterMenu] = useState(false);


//   const AddIntoleranceFilter = (e) =>{
//       setIntoleranceFilter( state.intolerances + e.target.value)
//   }
//   const AddTimeFilter = (e) =>{
//     setTimeFilter(state.maxReadyTime + e.target.value)
//   }
//   const AddMealTypeFilter = (e) =>{

//     setMealTypeFilter(state.type + e.target.value)
//   }
//     const AddCuisinefilter = (e) =>{

//         setCuisineFilter(state.cuisine + e.target.value)
//     }
//     const AddDietFilter = (e) =>{
//       setDietFilter(state.diet + e.target.value)
//     }

    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const [cuisineCollapsed, setCuisineCollapsed] = useState(false);
    const [dietCollapsed, setDietCollapsed] = useState(false);
    const [intoleranceCollapsed, setIntoleranceCollapsed] = useState(false);
    const [timeCollapsed, setTimeCollapsed] = useState(false);
    const [mealCollapsed, setMealCollapsed] = useState(false);


    const [showCuisineFilter, setShowCuisineFilter] = useState(false);
    const [showDietFilter, setShowDietFilter] = useState(false);
    const [showIntoleranceFilter, setShowIntoleranceFilter] = useState(false);
    const [showTimeFilter, setShowTimeFilter] = useState(false);
    const [showMealFilter, setShowMealFilter] = useState(false);


    const filterUrl = async () => {
        try {
            const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key1}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${searchString}`;
            console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            setSearchResult(result.results);
            console.log(result)
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
        setSearchString("");
    }

    const getActiveButtons = async () => {
        setSearchString("");
        let buttons = document.querySelectorAll('.active-btn');
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
        await setSearchString(`${dietString}${cuisineString}${mealtypeString}${intoleranceString}${timeString}`);
        console.log(searchString);
        await filterUrl();
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await filterUrl();
    };
    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="searchbar-container color-secondary">
                    <input
                        className="searchbar"
                        type="text"
                        name="queryvalue"
                        placeholder="search.."
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="search-btn color-primary" onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                        <i className="fa-solid fa-sliders slider-icon"></i>
                        {/*room for filtermenu component */}
                    </button>
                </div>
            </form>
            {/* tillfällig div med för filtreringen */}
            <div className={`filtermenu background-primary ${showFilterMenu ? "filter-show" : ""} `}>
                <div className="menu-header flex flex-separate">
                    <h2>Filter</h2>
                    <button className="close-filter background-primary" onClick={()=> setShowFilterMenu(!showFilterMenu)}>
                        <i class="fa-solid fa-xmark text-color-primary close-filter-icon"></i>
                    </button>
                </div>
                <div className="menu-body">
                    <div className="filter-container">
                        <button type="button" className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowCuisineFilter(!showCuisineFilter); setCuisineCollapsed(!cuisineCollapsed) }}>
                            <p className="filter-title text-color-primary">Cuisine</p>
                            <i className={`fa-solid ${cuisineCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>

                        <div className={`cuisine-filter ${showCuisineFilter ? "filter-show" : ""}`}>
                            {CuisineFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}</div>

                    </div>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowDietFilter(!showDietFilter); setDietCollapsed(!dietCollapsed) }}>
                            <p className="filter-title">Diet</p>
                            <i class={`fa-solid ${dietCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`diet-filter ${showDietFilter ? "filter-show" : ""}`}>
                        {DietFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                        </div>
                    </div>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowIntoleranceFilter(!showIntoleranceFilter); setIntoleranceCollapsed(!intoleranceCollapsed) }}>
                            <p className="filter-title">Intolerance</p>
                            <i className={`fa-solid ${intoleranceCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`intolerance-filter ${showIntoleranceFilter ? "filter-show" : ""}`}>
                        {IntoleranceFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                        </div>
                    </div>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowTimeFilter(!showTimeFilter); setTimeCollapsed(!timeCollapsed) }}>
                            <p className="filter-title">Time</p>
                            <i className={`fa-solid ${timeCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`time-filter ${showTimeFilter ? "filter-show" : ""}`}>
                        {TimeFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                        </div>
                    </div>
                    <div className="filter-container">
                        <button className="collapse-btn flex flex-separate background-primary" onClick={() => { setShowMealFilter(!showMealFilter); setMealCollapsed(!mealCollapsed) }}>
                            <p className="filter-title">Meal</p>
                            <i className={`fa-solid ${mealCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`meal-filter ${showMealFilter ? "filter-show" : ""}`} >
                        {MealTypeFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                        </div>
                    </div>
                </div>

                <div className="menu-footer">
                {/* <button className="clear-filter" onClick={() => inactivateButtons()}>Clear Filter</button>
                <button className="apply-filter" onClick={() => getActiveButtons()}>Apply filter</button> */}
                    <button className="clear-filter-btn color-secondary"  onClick={() => inactivateButtons()}>Clear Filter</button>
                    <button className="apply-filter-btn color-primary" onClick={() => getActiveButtons()}>Apply filter</button>
                </div>
            </div>
            {/* <div className="menu-body">
                <div className="cuisine">
                    <p className="filter-title">Cuisine</p>
                    <button className="collapse-btn">v</button>
                    {CuisineFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                </div>
                <div className="diet">
                    <p className="filter-title">Diet</p>
                    <button className="collapse-btn">v</button>
                    {DietFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                </div>
                <div className="intolerance">
                    <p className="filter-title">Intolerance</p>
                    <button className="collapse-btn">v</button>
                    {IntoleranceFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                </div>
                <div className="time">
                    <p className="filter-title">Time</p>
                    <button className="collapse-btn">v</button>
                    {TimeFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                </div>
                <div className="meal">
                    <p className="filter-title">Meal</p>
                    <button className="collapse-btn">v</button>
                    {MealTypeFilters.map((x, index) => {
                        return (
                            <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                        )
                    })}
                </div>
            </div>

            <div className="menu-footer">
                <button className="clear-filter" onClick={() => inactivateButtons()}>Clear Filter</button>
                <button className="apply-filter" onClick={() => getActiveButtons()}>Apply filter</button>
            </div> */}
        {/* </div > */}

    </>
  )
};