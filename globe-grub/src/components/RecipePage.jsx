import Checkbox from "./Checkbox";
import Tags from "./Tags";
import Ad from "./Ad";
import RecipeCard from "./RecipeCard";
import * as apiRecipePageFunction from "../modules/apiRecipePageFunction";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchResult } from "../hooks/useSearchResult";
import { useKey } from "../hooks/useKey";

//Komponent för receptsidan (enskilda recept när man klickar på ett receptkort)
export default function RecipePage() {
    const [similarRecipes, setSimilarRecipes]= useState("");
    const [loading, setLoading] = useState(true);
    const data = useSearchResult((state) => state.searchResult);
    const key = useKey((state) => state.key);
    
    const location = useLocation();
    const id = location.state;
    const [recipeData, setRecipe]= useState("");

    //Url till API:et där enskilt recepts id skickas in
    
    
    console.log(recipeData);
    
    
    useEffect(() => {
        
        const p = Promise.resolve(apiRecipePageFunction.fetchRecipe(id,key));
        p.then(value=>{
            console.log(value)
           setRecipe(value);
        },[])
        console.log(recipeData)
    }, []);

    
//     const fetchSimilarRecipes = (similarRecipes)=>{
//         let similarRecipesTemp = [];
//         console.log(similarRecipes);
//         similarRecipes.map((similarRecipe)=>{
//             fetch(`https://api.spoonacular.com/recipes/${similarRecipe.id}/information?&apiKey=${key}&includeNutrition=true`)
//             .then((response)=> response.json())
//             .then((data)=>{
//                 similarRecipesTemp.push(data);
//             })
//         })
//        return similarRecipesTemp;
//     }

//     const fetchRecipe=async()=>{
//         const response = await fetch(url);
//         const result = response.json();
//         return result,[];
//     }

//     const fetchSimilarRecipesBase = async()=>{
//         const response = await fetch(similarurl);
//         const result = response.json();
//          fetchSimilarRecipes(result,[]);
//     }
// console.log(similarRecipes)
// console.log(recipe)
// console.log(similarRecipes)

    //En loading-text så att datan hinner hämtas
    if (loading) {
        return (
            <div className="max-width-container loading-screen">
                <p>Loading...</p>
            </div>
        ) 
    }
    

    return (
        <>
            <Ad />
            <section className="max-width-container">
                {/* <!-- Receptnamn --> */}
                <div>
                    <Link to="/" className="go-back-text text-color-primary"><i className="fa-solid fa-chevron-left"></i> Go back to search results</Link>
                </div>
                <h1 className="recipe-title">{recipe.title}</h1>
                {recipeData.map((recipe)=>{
                    return(
                        <>
                <article className="recipe-container">
                    <div className="recipe-visual-container">
                        {/* <!-- Bild på maten --> */}
                        <div>
                              {/* Kollar om API saknar bild  */}
                            {recipe.image != undefined ?
                                <img className="recipe-image mr-4 ml-4"  src={recipe.image}/>
                                :
                                // Om bild saknas byts den ut
                                <img className="recipe-image mr-4 ml-4"  src="/images/foodimagenotfound.png"/>
                            }
                        </div>
                        {/* <!-- Taggar och likes --> */}
                        <div className="flex flex-separate">
                            {/* <!-- Taggar --> */}
                            <div className="flex tag-container-recipe-page">
                                <Tags
                                    time={recipe.time}
                                    cuisines={recipe.cuisines}
                                    diets={recipe.diets}
                                    dishTypes={recipe.dishTypes}
                                    vegan={recipe.vegan}
                                    vegetarian={recipe.vegetarian}
                                    clickable={true} />
                            </div>
                            {/* <!-- Likes --> */}
                            <div className="flex">
                                <p className="text-color-primary like-number"><i className="fa-regular fa-heart like-icon text-color-accent"></i> {recipe.aggregateLikes}</p>
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
                                        <p key={x.id} className="ingredient">
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
                        </>
                    )
                })}
            </section>
           <div className="recipe-card-container">
            
           </div>
                {similarRecipes.map((similarRecipe)=>{
                    return(
                        
                        <RecipeCard
                        key={similarRecipe.id}
                        id={similarRecipe.id}
                        title={similarRecipe.title}
                        diets={similarRecipe.diets}
                        image={similarRecipe.image}
                        cuisines={similarRecipe.cuisines}
                        dishTypes={similarRecipe.dishTypes}
                        time={similarRecipe.readyInMinutes}
                        aggregateLikes={similarRecipe.aggregateLikes}
                    /> 
                    )
                })}
          
            <Ad />
        </>
    );
}