import { useState } from "react";
import RecipeCard from "./RecipeCard";


export default function ResultContainer(props) {


  //props är datat som skickas från search => indexpage => resultcontainer (fetchen med sökresultat result.results)

 
  return (
    <section className="result-container max-width-container">
      {props.title == null
      ?
      <h1>Discover {props.cuisineTitle} Recipes</h1>
      :   <h1>Found {props.data.length} recipes matching: {props.title}</h1>
    }
      <div className="recipe-card-container">
        {props.data != null
        ? props.data.map((recipe) => {
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
        )})
        : <p>Key is used</p>}
       
      {/* /*props (property) .data (det som skickats från indexpage) mappas, 
       relevant data skickas till recipecard som hämtas ur varje enskild recept i result.results  */
    }
      </div>
    </section>
  );
}