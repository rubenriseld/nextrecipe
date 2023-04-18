import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

export default function RecipeCard(props) {
   const cuisines = Array.from(props.cuisines);
//skapa en array av vektor cuisines som skickades hit från resultcontainer för att 
//kunna skriva ut varje cuisinetyp (asian, thai osv) map funkar bara me arrayer 
  return (
    // <!-- RECIPE CARD COMPONENT -->
    <article className="recipe-card">
      {/* <!--single recipe card--> */}
      <img src={props.image} alt="Image" />

      <div className="recipe-card-info">
        <h3 className="recipe-card-title">{props.title}</h3>
        <div>
          {/* <!-- taggar --> */}
          <div className="flex">
            {/* <!--  ----   TAG COMPONENTS ---- -->
                      <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                          kommer vi ha tre tagg-komponenter
                       --> */}
            <p className="tag color-secondary">{props.time}min</p>
           
             {cuisines.map((cuisineTag) =>{ 
               if(cuisines.length > 0){
                return   <p className="tag color-secondary">{cuisineTag}</p>
               } 
              })}  
              {/*mappa cuisines, om arrayen inte är tom skriv ut en tagg för varje cuisinetype */}
             
        
            {/* <p className="tag color-secondary">{getTags}</p> */}
            <p className="tag color-secondary">vegan</p>
            {/* <!-- END OF TAG COMPONENTS --> */}
          </div>
          {/* <!-- Stjärnor --> */}
          <div className="flex">
            {/* <!-- STAR/RATING COMPONENT -->
                      <!-- kommer kanske ha som en enda komponent?? --> */}
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9733;</p>
            <p className="star text-color-secondary">&#9734;</p>
            {/* <!-- END OF STAR/RATING COMPONENT --> */}
          </div>
          {/* <p className="card-text">{props.summary}</p> */}
        </div>
      </div>
    </article>
  );
  {
    /* <!-- END OF RECIPE CARD COMPONENT --> */
  }
}
