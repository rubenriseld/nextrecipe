import { useState } from "react";
import { useFilterStore } from "../hooks/FilterMenu";
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems";
import { useSearchResult } from "../hooks/useSearchResult";
import {shallow } from "zustand/shallow";
import { FilterButton } from "./FilterButton";

export default function Search() {
    // search string
  const [searchInput, setSearchInput] = useState("");

//   const [firstButton, setFirstButton] = useState(false);
//   const [secondButton, setSecondButton] = useState(false);
//   const [thirdButton, setThirdButton] = useState(false);
//   const [fourthButton, setFourthButton] = useState(false);
//   const [fifthButton, setFifthButton] = useState(false);

  const getActiveButtons = () =>{
    let buttons = document.querySelectorAll('.active-btn');
    console.log(buttons)

    let searchString = "";
    // console.log
    buttons.forEach(btn => {
        console.log(btn.dataset.type);
        searchString+= btn.value;
    });

    console.log(searchString);
  }
  
  //search store for sending to indexpage
const [searchResult, setSearchResult] = useSearchResult((state) => 
[state.searchResult, state.setSearchResult], shallow);

//store for filter terms
  const state = useFilterStore.getState((state) => state);
  
  const [cuisineFilter, setCuisineFilter] = useState("");

  const [dietFilter, setDietFilter] = useState(""); 
  
  const [mealtypeFilter, setMealTypeFilter] = useState("");

  const [IntoleranceFilter, setIntoleranceFilter] = useState("");
  
  const [TimeFilter, setTimeFilter] = useState("");
  
  const key1= "13c6c14454a748769e3611a7cf719862";
  const key2= "74c179cdd6bf42fab75869c258580b05";
  const key3= "c02162ede9394dd8bca983829213bd71";
  const key4= "85ce5287879e42978484fcf300dace17";
  const key5= "8fbd9413e79a49bfaa909d68f22e0476";

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filterUrl = async () => {
  try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key1}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${cuisineFilter}${dietFilter}${mealtypeFilter}${TimeFilter}${IntoleranceFilter}`;     
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

  const handleFilter = (e,type) =>{
    console.log(type);
    switch(type){
      case "cuisine":
        if(cuisineFilter == ""){
          setCuisineFilter(`${state.cuisine}${e.target.value}`)     
        }
        else{
          setCuisineFilter(`${cuisineFilter},${e.target.value}`)
      };
      break;
      case "diet":
        if(dietFilter == ""){
          setDietFilter(`${state.diet}${e.target.value}`)     
        }
        else{
          setDietFilter(`${dietFilter},${e.target.value}`)
      };
      break;
      case "time":
        if(TimeFilter == ""){
          setTimeFilter(state.maxReadyTime + e.target.value);
        }else{
          setTimeFilter(`${TimeFilter},${e.target.value}`);
        }
      break;
      case "type":
        if(mealtypeFilter == ""){
          setMealTypeFilter(state.type + e.target.value);
        }else{
          setMealTypeFilter(`${mealtypeFilter},${e.target.value}`);
        }
      break;
      case "intolerances":
        if(IntoleranceFilter == ""){
          setIntoleranceFilter(state.intolerances + e.target.value);
        }else{
          setIntoleranceFilter(`${IntoleranceFilter},${e.target.value}`);
        }
      break;
    }
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
      {/* <div>
        <button value="one" className={`test-btn ${firstButton ? "btn-active":""}`} onClick={()=> setFirstButton(!firstButton)}>one</button>
        <button value="two" className={`test-btn ${secondButton ? "btn-active":""}`} onClick={()=> setSecondButton(!secondButton)}>two</button>
        <button value="three" className={`test-btn ${thirdButton ? "btn-active":""}`} onClick={()=> setThirdButton(!thirdButton)}>three</button>
        <button value="four" className={`test-btn ${fourthButton ? "btn-active":""}`} onClick={()=>  setFourthButton(!fourthButton)}>four</button>
        <button value="five" className={`test-btn ${fifthButton ? "btn-active":""}`} onClick={()=> setFifthButton(!fifthButton)}>five</button>
        <br />
        <button onClick={()=> getActiveButtons()}>search</button>
      </div> */}
      <div className={`filtermenu" ${showFilterMenu? "menu-links": ""} `}>
            <div className="menu-header">
                <h2>Filter</h2>
                <button className="close-filter">X</button>
            </div>
            <div className="menu-body">
                <div className="cuisine">
                    <p className="filter-title">Cuisine</p>
                    <button className="collapse-btn">v</button>
                      {CuisineFilters.map((x, index)=>{
                    return(
                        <FilterButton key={index} value={x.value} type={x.name} name={x.name} active={false}></FilterButton>
                      )
                      })}
                </div>
                <div className="diet">
                    <p className="filter-title">Diet</p>
                    <button className="collapse-btn">v</button>
                    {DietFilters.map((x, index)=>{
                  return(
                    <FilterButton key={index} value={x.value} name={x.name} active={false}></FilterButton>
                  )
                  })}
                </div>
                <div className="intolerance">
                    <p className="filter-title">Intolerance</p>
                    <button className="collapse-btn">v</button>
                        {IntoleranceFilters.map((x, index)=>{
                     return(
                        <FilterButton key={index} value={x.value} name={x.name} active={false}></FilterButton>
                      )
                      })}
                </div>
                <div className="time">
                    <p className="filter-title">Time</p>
                    <button className="collapse-btn">v</button>
                       {TimeFilters.map((x, index)=>{
                      return(
                        <FilterButton key={index} value={x.value} name={x.name} active={false}></FilterButton>
                      )
                      })}
                </div>
                <div className="meal">
                    <p className="filter-title">Meal</p>
                    <button className="collapse-btn">v</button>
                      {MealTypeFilters.map((x, index)=>{
                     return(
                        <FilterButton key={index} value={x.value} name={x.name} active={false}></FilterButton>
                      )
                      })}
                </div>
            </div>           
            
            <div className="menu-footer">
                <button className="clear-filter">Clear Filter</button>
                <button className="apply-filter" onClick={()=> getActiveButtons()}>Apply filter</button>
            </div>
        </div>
        
  </>
  )};