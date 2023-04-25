import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { useRecommendation } from "../hooks/UseRecommendations";

export default function ResultContainer(props) {
  
  let data = useRecommendation.getState((state) => state.recoResults);
  console.log(data);
  //props är datat som skickas från search => indexpage => resultcontainer (fetchen med sökresultat result.results)
  return (
    <section className="result-container max-width-container">
      <h1></h1>
      <div className="recipe-card-container">
        {props.data.map((recipe) => {
          return (
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              diets={recipe.diets}
              image={recipe.image}
              cuisines={recipe.cuisines}
              time={recipe.readyInMinutes}
              aggregateLikes={recipe.aggregateLikes}
            />
          );
          {
            /*props (property) .data (det som skickats från indexpage) mappas, 
       relevant data skickas till recipecard som hämtas ur varje enskild recept i result.results  */
          }
        })}
      </div>
    </section>
  );
}
