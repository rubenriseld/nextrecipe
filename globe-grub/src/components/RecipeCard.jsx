import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import RecipeRating from "./RecipeRating";
import  Tags from "./Tags";


export default function RecipeCard(props) {
    const cuisines = Array.from(props.cuisines);
    const diets = Array.from(props.diets);          //ska dessa tas bort kanske??
    const dishTypes = Array.from(props.dishTypes);
    //skapa en array av vektor cuisines som skickades hit från resultcontainer för att 
    //kunna skriva ut varje cuisinetyp (asian, thai osv) map funkar bara me arrayer 


    const key8="ce46b5aef3da4d67b273b1b7dec8567f";

    return (
        // <!-- RECIPE CARD COMPONENT -->
        <article className="recipe-card">
            <Link to={`/recipe/${props.id}`} state={props.id}>
                {/* <!--single recipe card--> */}
                <img src={props.image} alt="Image" />

                <div className="recipe-card-info">
                    <h3 className="recipe-card-title text-color-primary">{props.title}</h3>
                    <div>
                        {/* <!-- taggar --> */}
                        <div className="flex flex-separate">
                            {/* <!--  ----   TAG COMPONENTS ---- -->
                      <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                          kommer vi ha tre tagg-komponenter
                       --> */}
                            <div className="flex flex-column tag-container">
                                <Tags 
                                    time={props.time} 
                                    cuisines={props.cuisines} 
                                    diets={props.diets} 
                                    dishTypes={props.dishTypes} 
                                    vegan={props.vegan} 
                                    vegetarian={props.vegetarian}
                                    clickable={false}/>
                                {/* {props.time != null ?
                                    <p className="tag color-tag-one text-color-primary">{props.time} min</p>
                                    : <p></p>

                                }
                                {props.cuisines === undefined || props.cuisines.length == 0 ?
                                    <></> :
                                    <p className="tag color-tag-two text-color-primary">{props.cuisines[0]}</p>

                                }
                                {props.diets === undefined || props.diets.length == 0 ?
                                    <></> :
                                    <p className="tag color-tag-three text-color-primary">{props.diets[0].substring(0, 13)}</p>


                                } */}
                            </div>
                            {/* {cuisines.map((cuisineTag) =>{ 
                 if(cuisines.length > 0){
                     return   <p className="tag color-secondary">{cuisineTag}</p>
                    } 
                })}   */}
                            {/*mappa cuisines, om arrayen inte är tom skriv ut en tagg för varje cuisinetype */}


                            {/* <p className="tag color-secondary">{getTags}</p> */}
                            {/* {diets.map((dietTag) => {
                if (props.diets.length != 0) {
                    return <p className="tag color-secondary">{dietTag}</p>;
                }
            })} */}
                            {/* <!-- END OF TAG COMPONENTS --> */}
                            <div className="flex">
                                <RecipeRating likes={props.aggregateLikes} />
                                {/* <!-- STAR/RATING COMPONENT -->
                      <!-- kommer kanske ha som en enda komponent?? --> */}
                                {/* <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9734;</p> */}
                                {/* <!-- END OF STAR/RATING COMPONENT --> */}
                            </div>
                        </div>
                        {/* <!-- Stjärnor --> */}
                        {/* <p className="card-text">{props.summary}</p> */}
                    </div>
                </div>
            </Link>
        </article>

    );
}
