import Checkbox from "./Checkbox";
import Tags from "../common/Tags";
import Banner from "../common/Banner";

import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchResult } from "../../hooks/useSearchResult";
import { useKey } from "../../hooks/useKey";
import "./recipepage.css";

//Komponent för receptsidan (enskilda recept när man klickar på ett receptkort)
export default function RecipePage() {
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedPortions, setSelectedPortions] = useState(2);
    const data = useSearchResult((state) => state.searchResult);
    const key = useKey((state) => state.key);

    const location = useLocation();
    const id = location.state;
    

    //Url till API:et där enskilt recepts id skickas in
    const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${key}&includeNutrition=true`;
    //Funktion för att hämta receptet
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRecipe(data);
                setLoading(false);
                // console.log(recipe.image);
            });
    }, []);

    //En loading-text så att datan hinner hämtas
    if (loading) {
        return (
            <div className="max-width-container loading-screen">
                <p>Loading...</p>
            </div>
        ) 
    }
    
    //Funktion för att användaren ska få välja antalet portioner den vill se ingredienser för
    const pickPortions = () => {
        let portionsAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

        //Valda antalet portioner sätts i en useState
        const handleChange = (e) => {
            setSelectedPortions(e.target.value);
        }

        //Drop down select där antalet portioner väljs, default är 4
        return (
            <div className="select-box">
            <select name="portions" onChange={handleChange} defaultValue={portionsAmount[3]}>
                {portionsAmount.map((x, index) =>{
                    return <option value={x} key={index}>{x}</option>  
                })}
            </select>
            </div>
        )
    }

    //Funktion för att visa rätt mått på ingredienser beroende på valt antal portioner
    const ingredientsAmount = (amount) => {
        let portions = "";
        //portions blir måtten på ingredienser för 1 portion
        portions = amount / recipe.servings
        
        //portions multipliceras med det valda antalet portioner som användaren vill se
        //Måttet avrundas till två decimaltal
        return (selectedPortions * portions).toFixed(2);
    }

    return (
        <>
            <Banner />
            <section className="max-width-container">
                {/* <!-- Receptnamn --> */}
                <div>
                    <Link to="/" className="go-back-text text-color-primary"><i className="fa-solid fa-chevron-left"></i> Go back to search results</Link>
                </div>
                <h1 className="recipe-title">{recipe.title}</h1>

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
                        <h2 className="select-box">
                            Ingredients for {pickPortions()} portions
                        </h2>
                        {/* <!-- Ingrediensmått och ingredienser  --> */}
                        <div className="flex">
                            {/* <!-- Ingrediensmått --> */}
                            <div className="flex flex-column">
                                {recipe.extendedIngredients.map((x) => {
                                    return (
                                        <p className="ingredient">
                                            {ingredientsAmount(x.amount)} {x.unit}
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
            <Banner />
        </>
    );
}