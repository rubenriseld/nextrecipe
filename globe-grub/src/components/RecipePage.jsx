import Checkbox from "./Checkbox";
import StarRating from "./StarRating";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecipePage() {
<<<<<<< HEAD
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);

  
  const location = useLocation();
  const id = location.state;

  const url =  `https://api.spoonacular.com/recipes/${id}/information?&apiKey=13c6c14454a748769e3611a7cf719862`

  useEffect(()=> {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setRecipe(data);
      console.log(recipe);
      setLoading(false);
    });
  }, []);

  if(loading){
    return <p>Loading.........</p>
  }
    return (
=======
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const id = location.state;

  const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=74c179cdd6bf42fab75869c258580b05&includeNutrition=true`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipe(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
>>>>>>> 0a4f010de7c6f9f23c462d0660cf8e828266fc1f
    // <!-- RECIPE PAGE COMPONENT -->
    <section className="max-width-container">
      {/* <!-- Receptnamn --> */}
      <h1 className="recipe-title">{recipe.title}</h1>

      <article className="recipe-container">
        <div className="recipe-visual-container">
          {/* <!-- Bild på maten --> */}
          <div>
            <img className="recipe-image mr-4 ml-4" src={recipe.image} />
          </div>
          {/* <!-- Taggar och stjärnor --> */}
          <div className="flex flex-separate align-items-center">
            {/* <!-- Taggar --> */}
            <div className="flex tag-container">
              {/* <!--  ----   TAG COMPONENTS ---- --> */}
              {/* <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                            kommer vi ha tre tagg-komponenter
                         --> */}
              <p className="tag color-secondary">{recipe.readyInMinutes}min</p>
              {recipe.cuisines.map((cuisineTag) => {
                return <p className="tag color-secondary">{cuisineTag}</p>;
              })}
              {recipe.diets.map((dietTag) => {
                return <p className="tag color-secondary">{dietTag}</p>;
              })}
              {/* <!-- END OF TAG COMPONENTS --> */}
            </div>

            {/* <!-- Stjärnor --> */}
            <div className="flex">
              {/* <!-- STAR/RATING COMPONENT --> */}
              <StarRating />
            </div>
          </div>
        </div>
        <div className="recipe-ingredients">
          {/* <!-- (antalet portioner) --> */}
          <h2 className="ingredients-title">
            Ingredients for {recipe.servings} portions
          </h2>
          {/* <!-- Ingrediensmått och ingredienser  --> */}
          <div className="flex">
            {/* <!-- Ingrediensmått --> */}
            <div className="flex flex-column">
              {recipe.extendedIngredients.map((x) => {
                return (
                  <p className="ingredient">
                    {x.amount} {x.unit}
                  </p>
                );
              })}
            </div>
            {/* <!-- Ingredienser --> */}
            <div className="flex flex-column">
              {recipe.extendedIngredients.map((ingredient) => {
                return <p className="ingredient">{ingredient.name}</p>;
              })}
            </div>
          </div>
        </div>
        {/* Instruktioner */}
        <div className="recipe-instructions">
          {/* CHECKBOX COMPONENTS */}
          {recipe.analyzedInstructions.map((x) => {
            return (
              <>
                {x.steps.map((y) => {
                  return <Checkbox number={y.number} step={y.step} />;
                })}
              </>
            );
          })}
        </div>
      </article>
    </section>
  );
}
