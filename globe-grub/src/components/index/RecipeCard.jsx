import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import  Tags from "../common/Tags";
import "./recipecard.css";


// komponent för receptkorten som visas i resultatcontainrar
export default function RecipeCard(props) {
    
    return (
        <article className="recipe-card">
            <Link to={`/recipe/${props.id}`} state={props.id}>
                {/* <img src={props.image} onError={handleImageError} /> */}
                <div>
                              {/* Kollar om API saknar bild  */}
                            {props.image != undefined ?
                                <img   src={props.image}/>
                                :   
                                // Om bild saknas byts den ut
                                <img src="/images/imagenotfound.png"/>
                            }
                        </div>
                <div className="recipe-card-info">
                    <h3 className="recipe-card-title text-color-primary">{props.title}</h3>
                    <div>
                        {/* taggar */}
                        <div className="flex flex-separate">
                            <div className="flex flex-column tag-container">
                                <Tags 
                                    time={props.time} 
                                    cuisines={props.cuisines} 
                                    diets={props.diets} 
                                    dishTypes={props.dishTypes} 
                                    vegan={props.vegan} 
                                    vegetarian={props.vegetarian}
                                    clickable={false}/>
                
                            </div> 
                            {/* likes */}
                            <div className="flex">
                                <p className="text-color-primary like-number">
                                    <i className="fa-regular fa-heart like-icon text-color-accent"></i> 
                                    {props.aggregateLikes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}