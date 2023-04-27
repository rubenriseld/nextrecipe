import { useState } from "react";
import RecipeCard from "./RecipeCard";


export default function ResultContainer(props) {


  //props är datat som skickas från search => indexpage => resultcontainer (fetchen med sökresultat result.results)

 
  return (
    <section className="result-container max-width-container">
      {props.title != ""
      ?
      <h1>Discover {props.title} Recipes</h1>
      : null
    }
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
