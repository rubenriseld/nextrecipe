
import { useState} from "react";
import { useFilterStore } from "../hooks/useFilterStore";
import { useChosenFilterAmount } from "../hooks/useChosenFilterAmount";
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterArrays";
import { shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton";
import ApiSearchFunction from "./ApiSearchFunction";
import { useSearchParameters } from "../hooks/useSearchParameters";

export default function FilterMenu({childToParent, visible, refValue}){

    // antal valda filter som visas i Clear Filters-knappen
    const chosenFilters = useChosenFilterAmount(state => state.chosenFilters);

    const clearChosenFilter = useChosenFilterAmount(state => state.clearChosenFilter);
    console.log(chosenFilters)
    const [filterParameter, setFilterParameter]= useSearchParameters((state)=>
        [state.filterParameter, state.setFilterParameter],shallow);
    //______________________________FilterMeny_____________________________//
    const state = useFilterStore.getState((state) => state);
    
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
    
    
    const redirectToApiSearchFunction = ApiSearchFunction();
    //close filter menu when clicking outsie
    // const ref = useRef(null);
    
    // useEffect(() => {
    //     const Clickout = (e) => {
    //         if (!ref.current.contains(e.target)) {
    //             visible = false;
    //         }
    //     };
    //     document.addEventListener("mousedown", Clickout);
    //     return () => {
    //         document.removeEventListener("mousedown", Clickout);
    //     };        
    // });
    
    //Clear Filters
    const inactivateButtons = () => {
        let buttons = document.querySelectorAll('.active-btn');
        buttons.forEach(btn => {
            btn.click();
        })
        setFilterParameter("");
        clearChosenFilter();
    }
    //Apply Filters
    const getActiveButtons = async () => {
        let searchString = "";
        let buttons = document.querySelectorAll('.active-btn');
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
        searchString += `${dietString}${cuisineString}${mealtypeString}${intoleranceString}${timeString}`;
        setFilterParameter(searchString);
        console.log(searchString);
        redirectToApiSearchFunction();
    }
    // meny




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
            <button className="clear-filter-btn text-color-primary" onClick={() => inactivateButtons()}>Clear Filters{chosenFilters == 0 ? "" : ` (${chosenFilters})`}</button>
            <button className="apply-filter-btn color-primary text-color-light" onClick={() => { getActiveButtons(); childToParent(false) }}>Apply Filters</button>
        </div>
    </div>
    </>
)
}
