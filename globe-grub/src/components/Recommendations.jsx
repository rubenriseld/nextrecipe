import { shallow } from "zustand/shallow";
import { useRecommendation } from "../hooks/UseRecommendations";
import { useEffect, useState } from "react";
import { CuisineFilters} from "./FilterItems";
import ResultContainer from "./ResultContainer";
export default function Recommendations(){

    const key5 = "8fbd9413e79a49bfaa909d68f22e0476";
    const key1 = "e50fb6304553492781cba43da8b4bc7f";
    const key4 = "85ce5287879e42978484fcf300dace17";
    const key3 = "c02162ede9394dd8bca983829213bd71";
    const key2 = "74c179cdd6bf42fab75869c258580b05";
    const key6 ="e50fb6304553492781cba43da8b4bc7f";
    const key7 = "15c980413ad44f09ba2ac7e73f076610";
 
    
    const [recoResults, setRecoResults] = useRecommendation((state) =>
    [state.recoResults, state.setRecoResults], shallow);
    const [poo, setResult] = useState([]);
    
    const getRandomCuisine = () => {
        const currentCuisine = CuisineFilters[Math.floor(Math.random()*CuisineFilters.length)];
      
        return(
            currentCuisine.value
        )
    }  
    useEffect(()=>{
      let cuisine = getRandomCuisine()   
      const fetchData = async () =>{
        const response= await  fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine}&apiKey=${key7}`);
        const result = await response.json();
        setResult(result.recipes);
      }
      fetchData();
    },[])   
      return(
        <>
       <ResultContainer data={poo} ></ResultContainer>
        </>
      )
          
}    