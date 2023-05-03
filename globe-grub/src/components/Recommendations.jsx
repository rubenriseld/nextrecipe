
import { useEffect, useState } from "react";
import { CuisineFilters} from "./FilterItems";
import ResultContainer from "./ResultContainer";
import { useKey } from "../hooks/useKey";

export default function Recommendations(){
   
    //ändra key i useKey-hooken
   const key = useKey((state) => state.key);


    const [recoData, setResult] = useState([]);
    const [cuisineTitle, setCuisine] = useState("");
    
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
       <ResultContainer data={recoData} cuisineTitle={cuisineTitle} ></ResultContainer>
        </>
      )
          
}    