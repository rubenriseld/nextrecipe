
import { useEffect, useState } from "react";
import { cuisineFilters} from "../../internal_data/filterArrays";
import ResultContainer from "./ResultContainer";
import { useKey } from "../../hooks/useKey";
import "./recommendations.css";

// komponent för slumpmässigt genererade recept som dyker upp på startsidan
export function Recommendations(){
    //ändra key i useKey-hooken
   const key = useKey((state) => state.key);

    //data som skickas in till resultcontainer
    const [recoData, setResult] = useState([]);
    const [cuisineTitle, setCuisine] = useState("");
    
    //random funktion som slumpar fram 1 cuisine med 4 resultat i resultcontainer
    const getRandomCuisine = () => {
        const currentCuisine = cuisineFilters[Math.floor(Math.random()*cuisineFilters.length)];
        return currentCuisine
    }  
    useEffect(()=>{
      let cuisine = getRandomCuisine()
      const fetchData = async () =>{
        const response= await  fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine.value}&apiKey=${key}`);
        const result = await response.json();
        console.log(cuisine.value)
        setResult(result.recipes);
        setCuisine(cuisine.name);
      }
      fetchData();
    },[])   
      return(
        <>
       <ResultContainer data={recoData} cuisineTitle={cuisineTitle} isReco={true}></ResultContainer>
        </>
      )
          
}    