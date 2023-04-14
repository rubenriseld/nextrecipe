import {useLocation} from "react-router-dom"
import { useState, useEffect } from "react";

export default function Recipe(){
    const [recipeData, setData] = useState(Object);
    const [cusines, setCuisines] = useState([]);
   const location = useLocation();
        
       const url = `https://api.spoonacular.com${location.pathname}/information?includeNutrition=false&apiKey=85ce5287879e42978484fcf300dace17`;
       
            useEffect(()=>{
        try{
            fetch(url)
            .then((response) => response.json())
            .then((data)=>{
                setData(data);
                setCuisines(data.cuisines)
                console.log(data);
            })
             }
        catch(e){
         console.log(e);
        }
     
            }, []);

   return(

   <div>
    <p>{recipeData.title}</p>
    {cusines.map((x)=>{
        return(
            <ul>
                <li>{x}</li>
            </ul>
        )
    })}
   </div>
   )
  
}