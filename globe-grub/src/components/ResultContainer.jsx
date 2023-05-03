import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useResultsToShow } from "../hooks/useResultsToShow";
import { shallow } from "zustand/shallow";

// import {concat, slice} from 'lodash';



export default function ResultContainer(props) {
//show-more-grej
const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow);

    //props är datat som skickas från search => indexpage => resultcontainer (fetchen med sökresultat result.results)
    //-------------------------------

    // const length = 4;
   
    // const [resultsToShow, setResultsToShow] = useState(length);
    //Om showMore är true visas "Show More" -knappen
    // const [showMore, setShowMore] = useState(true);
    // props.isNewResult == false;

    // if(props.isNewResult == true){
    //     setResultsToShow(length);
    // }
    const loadMore = () => {
        // const newShowMore = resultsToShow < (length - 1);
        // setShowMore(newShowMore);
        setResultsToShow(8);
        console.log(resultsToShow);
    }

  //---------------------------------

  return (
    <>
    <section className="result-container max-width-container">
      

      {props.title == null
      ?
      <h1>Discover {props.cuisineTitle} Recipes</h1>
      : props.data == null || props.data =="empty"
      ?<>
        <h1>Search for: "{props.title}" gave no results. </h1>
        <p>Search for something else or go back to the homepage for to get recommendations.</p>
        </> 
      :<h1>Found {props.data.length} recipes matching: {props.title}</h1>
    }
{/* props.data.split(index,--------list*/}
      <div className="recipe-card-container">
       {props.data != null && props.data != "empty"
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
                time={recipe.readyInMinutes}
                aggregateLikes={recipe.aggregateLikes}
              />
              ): 
              <></>})
              : <>key is used</>}
      {/* /*props (property) .data (det som skickats från indexpage) mappas, 
       relevant data skickas till recipecard som hämtas ur varje enskild recept i result.results  */}
      </div>
      
    </section>
    {props.isReco ===false && resultsToShow < 8?
        <button onClick={loadMore} className="show-more-btn color-primary text-color-light">Show More</button>
        : <></>
    }
    </>
  )
}
//---------------------------------------------------------------
//---------------------------------------------------------------