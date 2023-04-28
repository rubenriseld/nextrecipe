import Checkbox from "./Checkbox";
import RecipeRating from "./RecipeRating";
import  Tags from "./Tags";

import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchResult } from "../hooks/useSearchResult";

export default function RecipePage() {
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(true);

    const data = useSearchResult((state) => state.searchResult);

    const location = useLocation();
    const id = location.state;

    const key1 = "13c6c14454a748769e3611a7cf719862";
    const key2 = "74c179cdd6bf42fab75869c258580b05";
    const key3 = "c02162ede9394dd8bca983829213bd71";
    const key4 = "85ce5287879e42978484fcf300dace17";
    const key5 = "8fbd9413e79a49bfaa909d68f22e0476";
    const key6 = "e50fb6304553492781cba43da8b4bc7f";
    const key7 = "15c980413ad44f09ba2ac7e73f076610";

    const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${key2}&includeNutrition=true`;

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
        // <!-- RECIPE PAGE COMPONENT -->
        <section className="max-width-container">
            {/* <!-- Receptnamn --> */}
            <div>
                <Link to="/" className="text-color-primary">Back</Link>
            </div>
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
                            <Tags 
                                    time={recipe.time} 
                                    cuisines={recipe.cuisines} 
                                    diets={recipe.diets} 
                                    dishTypes={recipe.dishTypes} 
                                    vegan={recipe.vegan} 
                                    vegetarian={recipe.vegetarian}
                                    clickable={true}/>

                            {/* <!--  ----   TAG COMPONENTS ---- --> */}
                            {/* <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                            kommer vi ha tre tagg-komponenter
                         --> */}
                            {/* <p className="tag color-secondary">{recipe.readyInMinutes}min</p>
                            {recipe.cuisines.map((cuisineTag) => {
                                return <p className="tag color-secondary">{cuisineTag}</p>;
                            })}
                            {recipe.diets.map((dietTag) => {
                                return <p className="tag color-secondary">{dietTag}</p>;
                            })} */}
                            {/* {recipe.readyInMinutes == null ?
                                    <></> :
                                    <p className="tag color-tag-one text-color-primary">{recipe.readyInMinutes} min</p>
                                }
                                {recipe.cuisines === undefined || recipe.cuisines.length == 0 ?
                                    <></> :
                                    <p className="tag color-tag-two text-color-primary">{recipe.cuisines[0]}</p>
                                }
                                {recipe.diets === undefined || recipe.diets.length == 0 ?
                                    <></> :
                                    <p className="tag color-tag-three text-color-primary">{recipe.diets[0].substring(0, 13)}</p>
                                } */}

                            {/* <!-- END OF TAG COMPONENTS --> */}
                        </div>

                        {/* <!-- Stjärnor --> */}
                        <div className="flex">
                            {/* <!-- STAR/RATING COMPONENT --> */}
                            <RecipeRating likes={recipe.aggregateLikes}/>
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