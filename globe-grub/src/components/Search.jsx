import { useState } from "react";
import { useFilterStore } from "../hooks/FilterMenu";
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems";

export default function Search({ childToParent }) {
  const [searchInput, setSearchInput] = useState("");
  //const [recipeData, setRecipeData] = useState([]);
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

  const AddIntoleranceFilter = (e) =>{
      setIntoleranceFilter( state.intolerances + e.target.value)
  }
  const AddTimeFilter = (e) =>{
    setTimeFilter(state.maxReadyTime + e.target.value)
  }
  const AddMealTypeFilter = (e) =>{

    setMealTypeFilter(state.type + e.target.value)
  }
    const AddCuisinefilter = (e) =>{

        setCuisineFilter(state.cuisine + e.target.value)
    }
    const AddDietFilter = (e) =>{
      setDietFilter(state.diet + e.target.value)
    }
    const handleChange = (e) => {
      setSearchInput(e.target.value);
    };
    const handleSubmit = (e) => { 
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key4}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${cuisineFilter}${dietFilter}${mealtypeFilter}${TimeFilter}${IntoleranceFilter}`;
      
      console.log(url);
      fetch(url)
      .then((response) => response.json())
      .then((result)=> {
        const recipeData = result.results;
        childToParent(recipeData); 
      })
  
      //result.results är en lista av alla recept, dessa skickas in i childtoparent
    //här skickas dessa till indexpage
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="searchbar-container color-secondary">
      <input
        className="searchbar"
        type="text"
        name="queryvalue"
        placeholder="search.."
        onChange={handleChange}
      />
      {/* tillfällig div med för filtreringen */}

      <div onClick={AddIntoleranceFilter}>
      {IntoleranceFilters.map((x, index)=>{
        return(
            <button key={index} value={x.value}>{x.name}</button>
        )
      })} </div>
      <div onClick={AddTimeFilter}>
      {TimeFilters.map((x, index)=>{
        return(
            <button key={index} value={x.value}>{x.name}</button>
        )
      })} </div>

      <div onClick={AddCuisinefilter}>
      {CuisineFilters.map((x, index)=>{
        return(
            <button key={index} value={x.value}>{x.name}</button>
        )
      })} </div>
      <div onClick={AddDietFilter}>
      {DietFilters.map((x, index)=>{
        return(
            <button key={index} value={x.value}>{x.name}</button>
        )
      })}
      </div>
      <div onClick={AddMealTypeFilter}>
      {MealTypeFilters.map((x, index)=>{
        return(
            <button key={index} value={x.value}>{x.name}</button>
        )
      })}
      </div>    
      
      <button
        type="button"
        className="search-btn color-primary"
        onClick={handleSubmit}>
        <i className="fa-solid fa-sliders slider-icon"></i>
        {/*room for filtermenu component */}
      </button>

    </div>
  );
}
