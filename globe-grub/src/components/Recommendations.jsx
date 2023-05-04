
import { useEffect, useState } from "react";
import { CuisineFilters} from "./FilterItems"; //cuisine array från filteritems som innehåller alla cuisines som finns i apiet
import ResultContainer from "./ResultContainer";//skicka resultcontainer härifårn med recommendations data
import { useKey } from "../hooks/useKey";

export default function Recommendations(){
   
    //ändra key i useKey-hooken
   const key = useKey((state) => state.key);

    //data som skickas in till resultcontainer
    const [recoData, setResult] = useState([]);
    const [cuisineTitle, setCuisine] = useState("");
    
    //random funktion som slumpar fram 1 cuisine med 4 resultat i resultcontainer
    const getRandomCuisine = () => {
        const currentCuisine = CuisineFilters[Math.floor(Math.random()*CuisineFilters.length)];
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