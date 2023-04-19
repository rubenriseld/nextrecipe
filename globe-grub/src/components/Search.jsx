import { useState } from "react";
import { useFilterStore } from "../hooks/FilterMenu";
import { CuisineFilters, DietFilters, IntoleranceFilters, TimeFilters, MealTypeFilters } from "./FilterItems";

export default function Search({ childToParent }) {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [state, getFilterState] = useState(""); //hämtar state från Hook
  const [cuisineFilter, setCuisineFilter] = useState(""); //värde på det som ska läggas till
  const [dietFilter, setDietFilter] = useState(""); //värde på det som ska läggas till
  const [mealtypeFilter, setMealTypeFilter] = useState(""); //värde på det som ska läggas till
  const [IntoleranceFilter, setIntoleranceFilter] = useState(""); //värde på det som ska läggas till
  const [TimeFilter, setTimeFilter] = useState(""); //värde på det som ska läggas till
  // const [countFilters, setCount] = useState(0);
  

  const key1= "13c6c14454a748769e3611a7cf719862";
  const key2= "74c179cdd6bf42fab75869c258580b05";
  const key3= "c02162ede9394dd8bca983829213bd71";
  const key4= "85ce5287879e42978484fcf300dace17";
  const key5= "8fbd9413e79a49bfaa909d68f22e0476";

  const filterUrl = async () => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key1}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${cuisineFilter}${dietFilter}${mealtypeFilter}${TimeFilter}${IntoleranceFilter}`;
      
      console.log(url);
      const response = await fetch(url); 
      const result = await response.json();
      setRecipeData(result.results);
      console.log(result)
      //result.results är en lista av alla recept, dessa skickas in i childtoparent
      
    } catch (e) {
      console.log(e);
    }
  };


  const AddIntoleranceFilter = (e) =>{
    getFilterState(useFilterStore.getState((state) => state.intolerances)); //hämtar värdet på cuisine taggen från hook
    setIntoleranceFilter(state.intolerances + e.target.value)
  }

  const AddTimeFilter = (e) =>{
    getFilterState(useFilterStore.getState((state) => state.maxReadyTime)); //hämtar värdet på cuisine taggen från hook
    setTimeFilter(state.maxReadyTime + e.target.value)
  }


  const AddMealTypeFilter = (e) =>{
    getFilterState(useFilterStore.getState((state) => state.type)); //hämtar värdet på cuisine taggen från hook
    setMealTypeFilter(state.type + e.target.value)
  }

    const AddCuisinefilter = (e) =>{
        getFilterState(useFilterStore.getState((state) => state.cuisine)); //hämtar värdet på cuisine taggen från hook
        setCuisineFilter(state.cuisine + e.target.value)
    }
    const AddDietFilter = (e) =>{
      getFilterState(useFilterStore.getState((state) => state.diet)); //hämtar värdet på cuisine taggen från hook
      setDietFilter(state.diet + e.target.value)
    }



    const handleChange = (e) => {
      setSearchInput(e.target.value);
    };
    const handleSubmit = (e) => {
    filterUrl();
    childToParent(recipeData); //här skickas dessa till indexpage
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
