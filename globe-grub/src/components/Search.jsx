import { useState } from "react";
import { useFilterStore } from "../hooks/FilterMenu";
import { CuisineFilters } from "./FilterItems";

export default function Search({ childToParent }) {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [state, getFilterState] = useState(""); //hämtar state från Hook
  const [filter, setFilter] = useState(""); //värde på det som ska läggas till
  

  const key1= "13c6c14454a748769e3611a7cf719862";
  const key2= "74c179cdd6bf42fab75869c258580b05";
  const key3= "c02162ede9394dd8bca983829213bd71";
  const key4= "85ce5287879e42978484fcf300dace17";
  const key5= "8fbd9413e79a49bfaa909d68f22e0476";

  const filterUrl = async () => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key5}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true${filter}`;
      console.log(filter);
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

    const Addfilter = (e) =>{
       getFilterState(useFilterStore.getState((state) => state.cuisine)); //hämtar värdet på cuisine taggen från hook
      setFilter(state.cuisine + e.target.value); //ange värde till filter från state.cuisine och vald cuisine
       console.log(filter);
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
      <div onClick={Addfilter}>
      {CuisineFilters.map((x, index)=>{
        return(
            <button key={index} value= {x.value}>{x.name}</button>
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
