
import { useState} from "react";
// import { useFilterStore } from "../hooks/useFilterStore";
import { useChosenFilterAmount } from "../hooks/useChosenFilterAmount";
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterArrays";
import { shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton";
import { useSearchParameters } from "../hooks/useSearchParameters";
import * as apiSearchFunctions from "../modules/apiSearchFunctions";
import { useKey } from "../hooks/useKey";
import { useSearchResult } from "../hooks/useSearchResult";
import { useResultsToShow } from "../hooks/useResultsToShow";


export default function FilterMenu({childToParent, visible, refValue}){
    
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

    // antal valda filter som visas i Clear Filters-knappen
    const chosenFilters = useChosenFilterAmount(state => state.chosenFilters);
    const clearChosenFilters = useChosenFilterAmount(state => state.clearChosenFilter);

    //______________________________FilterMeny_____________________________//
    // const state = useFilterStore.getState((state) => state);
    
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
    
    

    const clearFilters = () => {
        let buttons = document.querySelectorAll('.active-btn');
        buttons.forEach(btn => {
            btn.click();
        })
        clearChosenFilters();
    }
    const applyFilters = async () => {
        let fetchedData = await apiSearchFunctions.fetchRecipes(key, null);
        console.log("filtermenu:");
        console.log(fetchedData);
        setResultsToShow(8);
        setSearchResult(fetchedData[0]);
        setTitle(apiSearchFunctions.manipulateTitle(fetchedData[1], fetchedData[2]));
    }

return (
    <>
    <div className={`filter-menu background-primary ${visible ? "" : "filter-show"} `} ref={refValue}>
        <div className="menu-header flex flex-separate text-color-primary">
            <h2 className="filter-menu-title">Filter</h2>
            <button className="close-filter background-primary" onClick={() => childToParent(false)}>
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
            <button className="clear-filter-btn text-color-primary" onClick={() => clearFilters()}>Clear Filters{chosenFilters == 0 ? "" : ` (${chosenFilters})`}</button>
            <button className="apply-filter-btn color-primary text-color-light" onClick={() => { applyFilters(); childToParent(false) }}>Apply Filters</button>
        </div>
    </div>
    </>
)
}
