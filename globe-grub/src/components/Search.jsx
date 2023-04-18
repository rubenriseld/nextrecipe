import { useState } from "react";

export default function Search({ childToParent }) {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);

  const key1 = "13c6c14454a748769e3611a7cf719862";
  const key2 = "74c179cdd6bf42fab75869c258580b05";
  const key3 = "c02162ede9394dd8bca983829213bd71";
  const key4 = "85ce5287879e42978484fcf300dace17";

  const filterUrl = async () => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key2}&query=${searchInput}&includeIngredients=${searchInput}&addRecipeInformation=true`;
      const response = await fetch(url);
      const result = await response.json();
      setRecipeData(result.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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

      <button
        type="button"
        className="search-btn color-primary"
        onClick={handleSubmit}
      >
        <i className="fa-solid fa-sliders slider-icon"></i>
        {/*room for filtermenu component */}
      </button>
    </div>
  );
}
