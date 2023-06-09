
import { useState } from "react";
import { cuisineFilters, dietFilters, intoleranceFilters, maxReadyTimeFilters, mealTypeFilters } from "../../internal_data/filterArrays";
import { useChosenFilterAmount } from "../../hooks/useChosenFilterAmount";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { useSearchResult } from "../../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import FilterButton from "./FilterButton";
import * as apiSearchFunctions from "../../modules/apiSearchFunctions";
import { apiKey } from "../../internal_data/apiKey";
import "./filtermenu.css"

export default function FilterMenu({ filterMenuToSearch, visible, refValue }) {

    //key som hamnar i url
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

    // antal valda filter som visas i Clear Filters-knappen
    const chosenFilters = useChosenFilterAmount(state => state.chosenFilters);
    const clearChosenFilters = useChosenFilterAmount(state => state.clearChosenFilter);

    //bools för att öppna/stänga kategorier i filtermenyn
    const [cuisineCollapsed, setCuisineCollapsed] = useState(true);
    const [dietCollapsed, setDietCollapsed] = useState(true);
    const [intoleranceCollapsed, setIntoleranceCollapsed] = useState(true);
    const [timeCollapsed, setTimeCollapsed] = useState(true);
    const [mealCollapsed, setMealCollapsed] = useState(true);

    //rensa alla valda filterknappar
    const clearFilters = () => {
        let buttons = document.querySelectorAll('.active-btn');
        buttons.forEach(btn => {
            btn.click();
        })
        clearChosenFilters();
    }
    //applicera filter (gör en sökning)
    const applyFilters = async () => {
        let fetchedData = await apiSearchFunctions.fetchRecipes(key, null);
        console.log("filtermenu:");
        console.log(fetchedData);
        setResultsToShow(8);
        setSearchResult(fetchedData[0]);
        //justerar sök- och filterparametrarna som returneras av fetchRecipes för att
        //sätta titel på sökresultatet
        setTitle(apiSearchFunctions.manipulateTitle(fetchedData[1], fetchedData[2]));
    }

    return (
        <>
            <div className={`filter-menu background-primary ${visible ? "" : "filter-show"} `} ref={refValue}>
                <div className="menu-header flex flex-separate text-color-primary">
                    <h2 className="filter-menu-title">Filter</h2>
                    <button className="close-filter-btn text-color-primary background-primary" onClick={() => filterMenuToSearch(false)}>
                        <i className="fa-solid fa-xmark close-filter-icon"></i>
                    </button>
                </div>
                <hr className="filter-line"></hr>
                <div className="menu-body">
                    <div className="filter-container">
                        <button type="button" className="collapse-btn text-color-primary flex flex-separate background-primary" onClick={() => { setCuisineCollapsed(!cuisineCollapsed) }}>
                            <p className="filter-title">Cuisine</p>
                            <i className={`fa-solid collapse-icon ${cuisineCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`cuisine-filter ${cuisineCollapsed ? "filter-show" : ""}`}>
                            {cuisineFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}</div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn text-color-primary flex flex-separate background-primary" onClick={() => { setDietCollapsed(!dietCollapsed) }}>
                            <p className="filter-title">Diet</p>
                            <i className={`fa-solid collapse-icon ${dietCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`diet-filter ${dietCollapsed ? "filter-show" : ""}`}>
                            {dietFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn text-color-primary flex flex-separate background-primary" onClick={() => { setIntoleranceCollapsed(!intoleranceCollapsed) }}>
                            <p className="filter-title">Intolerance</p>
                            <i className={`fa-solid collapse-icon ${intoleranceCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`intolerance-filter ${intoleranceCollapsed ? "filter-show" : ""}`}>
                            {intoleranceFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn text-color-primary flex flex-separate background-primary" onClick={() => { setTimeCollapsed(!timeCollapsed) }}>
                            <p className="filter-title">Time</p>
                            <i className={`fa-solid collapse-icon ${timeCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`time-filter ${timeCollapsed ? "filter-show" : ""}`}>
                            {maxReadyTimeFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                    <hr className="filter-line"></hr>
                    <div className="filter-container">
                        <button className="collapse-btn text-color-primary flex flex-separate background-primary" onClick={() => { setMealCollapsed(!mealCollapsed) }}>
                            <p className="filter-title">Meal</p>
                            <i className={`fa-solid collapse-icon ${mealCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}></i>
                        </button>
                        <div className={`meal-filter ${mealCollapsed ? "filter-show" : ""}`} >
                            {mealTypeFilters.map((x, index) => {
                                return (
                                    <FilterButton key={index} value={x.value} type={x.type} name={x.name} active={false}></FilterButton>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="filter-footer">
                    <button className="clear-filter-btn text-color-primary" onClick={() => clearFilters()}>Clear Filters{chosenFilters == 0 ? "" : ` (${chosenFilters})`}</button>
                    <button className="apply-filter-btn color-primary text-color-light border-color-primary" onClick={() => { applyFilters(); filterMenuToSearch(false) }}>Apply Filters</button>
                </div>
            </div>
        </>
    )
}
