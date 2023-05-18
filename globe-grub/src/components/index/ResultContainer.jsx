import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { shallow } from "zustand/shallow";
import "./resultcontainer.css";

// komponent för receptkort (resultat) från antingen rekommendationer
// eller sökresultat
export default function ResultContainer(props) {
    const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow);

    // funktion för att visa fler resultat från sökningens hämtning
    const loadMore = () => {
        setResultsToShow(resultsToShow + 8);
    }

    return (
        <>
            <section className="result-container max-width-container">
                {/* om search-sökning är tom, visa recommendations title
                om data är null eller "empty", visa meddelande
                annars, visa hur många recept som hittats på det som sökts*/}

                {props.data == "maperror" ?
                    <h1 className="result-title">Country doesn't exist in API</h1>
                    :
                    props.title == null
                        ?
                        <h1 className="result-title">Discover {props.cuisineTitle} Recipes</h1>
                        : props.data == null || props.data == "empty"
                            ? <>
                                <h1 className="result-title">Search for "{props.title}" gave no results. </h1>
                                <p>Search for something else or go back to the homepage to get recommendations!</p>
                            </>
                            : <h1 className="result-title">Found {props.data.length} recipes matching: {props.title}</h1>
                }
                {/* props.data.split(index,--------list*/}
                <div className="recipe-card-container">
                    {props.data != null && props.data != "empty" && props.data != "maperror"
                        ?
                        props.data.map((recipe, index) => {
                            //skriver bara ut så många recept som det finns i "resultsToShow"
                            return index < resultsToShow ? (
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
                            ) :
                                <></>
                        })
                        : <></>}
                    {/* /*props (property) .data (det som skickats från indexpage) mappas, 
       relevant data skickas till recipecard som hämtas ur varje enskild recept i result.results  */}
                </div>

            </section>
            {props.isReco === false && resultsToShow < props.data.length ?
                <button onClick={loadMore} className="btn show-more-btn color-primary text-color-light">Show More</button>
                : <></>
            }
        </>
    )
}