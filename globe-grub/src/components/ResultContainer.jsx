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
                key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              diets={recipe.diets}
              image={recipe.image}
              cuisines={recipe.cuisines}
              dishTypes={recipe.dishTypes}
              time={recipe.maxReadyTime}
              aggregateLikes={recipe.aggregateLikes}
            />
          );
        })}
      </div>
    </section>
  );
}