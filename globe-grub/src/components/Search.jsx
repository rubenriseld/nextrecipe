import { useState } from "react";

export default function Search({ childToParent }) {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);

  const key1= "13c6c14454a748769e3611a7cf719862";
  const key2= "74c179cdd6bf42fab75869c258580b05";
  const key3="c02162ede9394dd8bca983829213bd71";
  const key4="85ce5287879e42978484fcf300dace17";

  const filterUrl = async () => {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${apiKey1}&query=${searchInput}&includeIngredients=${searchInput}`;
      const response = await fetch(url);
      const result = await response.json();
      setRecipeData(result.results);
      {
        recipeData.map((recipe) => {
          try {
            const url = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=74c179cdd6bf42fab75869c258580b05&includeNutrition=true`;
            const response = fetch(url);
            const result = response.json();
          } catch {}
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    filterUrl();
    childToParent(recipeData);
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
