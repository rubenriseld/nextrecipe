import { useState } from "react";
import { useSearchResult } from "../hooks/useSearchResult";
import {shallow } from "zustand/shallow";

export default function Search() {
    // { childToParent }
  const [searchInput, setSearchInput] = useState("");
//   const [recipeData, setRecipeData] = useState([]);
  const [searchResult, setSearchResult] = useSearchResult((state) => 
  [state.searchResult, state.setSearchResult], shallow);

  const key1 = "13c6c14454a748769e3611a7cf719862";
  const key2 = "74c179cdd6bf42fab75869c258580b05";
  const key3 = "c02162ede9394dd8bca983829213bd71";
  const key4 = "85ce5287879e42978484fcf300dace17";

  const filterUrl = async () => {
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key2}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true`;
        const response = await fetch(url);
        const result = await response.json();
        setSearchResult(result.results); //uppdaterar searchResult-staten med resultate
        console.log(searchResult);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await filterUrl();
  };


  return (
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
                type="submit"
                className="search-btn color-primary"
                >
                <i className="fa-solid fa-sliders slider-icon"></i>
                {/*room for filtermenu component */}
            </button>
        </div>
    </form>
  );
}
