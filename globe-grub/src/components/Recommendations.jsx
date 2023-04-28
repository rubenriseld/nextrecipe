
import { useEffect, useState } from "react";
import { CuisineFilters} from "./FilterItems";
import ResultContainer from "./ResultContainer";

export default function Recommendations(){

  const key6 = "e50fb6304553492781cba43da8b4bc7f";
  const key1 = "13c6c14454a748769e3611a7cf719862";
  const key2 = "74c179cdd6bf42fab75869c258580b05";
  const key3 = "c02162ede9394dd8bca983829213bd71";
  const key4 = "85ce5287879e42978484fcf300dace17";
  const key5 = "8fbd9413e79a49bfaa909d68f22e0476";
  const key7 = "15c980413ad44f09ba2ac7e73f076610";
 
    

    const [poo, setResult] = useState([]);
    const [test, setCuisine] = useState("");
    
    const getRandomCuisine = () => {
        const currentCuisine = CuisineFilters[Math.floor(Math.random()*CuisineFilters.length)];
        return currentCuisine
    }  
    useEffect(()=>{
      let cuisine = getRandomCuisine()
      const fetchData = async () =>{
        const response= await  fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine.value}&apiKey=${key5}`);
        const result = await response.json();
        console.log(cuisine.value)
        setResult(result.recipes);
        setCuisine(cuisine.name);
      }
      fetchData();
    },[])   
      return(
        <>
       <ResultContainer data={poo} cuisineTitle={test} ></ResultContainer>
        </>
      )
          
}    