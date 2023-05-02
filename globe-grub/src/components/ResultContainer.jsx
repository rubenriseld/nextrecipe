import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import {concat, slice} from 'lodash';


export default function ResultContainer(props) {


  //props är datat som skickas från search => indexpage => resultcontainer (fetchen med sökresultat result.results)
  //-------------------------------

const length = 4;
const [resultsToShow, setResultsToShow] = useState(length);
  //Om showMore är true visas "Show More" -knappen
const [showMore, setShowMore] = useState(true);

const loadMore = () => {
    const newShowMore = resultsToShow < (length - 1);
    setShowMore(newShowMore);
    setResultsToShow(resultsToShow+length);
    console.log(resultsToShow);
}

  //---------------------------------

  return (
    <section className="result-container max-width-container">
      {props.title == null
      ?
      <h1>Discover {props.cuisineTitle} Recipes</h1>
      : props.data == null
        ?<>
        <h1>No recipes found matching: {props.title} </h1>
        <p>Try searching for something else!</p>
        </> 
      :<h1>Found {props.data.length} recipes matching: {props.title}</h1>
    }
{/* props.data.split(index,--------list*/}
      <div className="recipe-card-container">
       {props.data != null
        ?
         props.data.map((recipe, index) => {
          //skriver bara ut så många recept som det finns i "resultsToShow"
            return index < resultsToShow? (
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
              ): 
              <></>})
              : null}
      {/* /*props (property) .data (det som skickats från indexpage) mappas, 
       relevant data skickas till recipecard som hämtas ur varje enskild recept i result.results  */}
      </div>
      {showMore && <button onClick={loadMore}> Show More </button>}
    </section>
  )
}
//---------------------------------------------------------------
//---------------------------------------------------------------