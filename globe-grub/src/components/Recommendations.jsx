
import { useEffect, useState } from "react";
import { CuisineFilters} from "./FilterItems";
import ResultContainer from "./ResultContainer";

export default function Recommendations(){

  const key1 = "13c6c14454a748769e3611a7cf719862"; //nel 
  const key2 = "74c179cdd6bf42fab75869c258580b05";
  const key3 = "c02162ede9394dd8bca983829213bd71";
  const key4 = "85ce5287879e42978484fcf300dace17";//nel
  const key5 = "8fbd9413e79a49bfaa909d68f22e0476";//nel
  const key6 = "ce46b5aef3da4d67b273b1b7dec8567f";
  const key7 = "15c980413ad44f09ba2ac7e73f076610";
  const key8 = "e50fb6304553492781cba43da8b4bc7f";//nel
  const key9 = "32603e2291624b4689643c2428fbe5f1";
  const key10 = "7e4ba385c74c4c0595bbb872618f7fc2";
  const key11 = "9c18433a167642f1a942f5b66f28a73e";
  const key12="7d22a6b4acf44702bdd65c55ce0b9290";//anv 05-02 09.30

    const [recoData, setResult] = useState([]);
    const [cuisineTitle, setCuisine] = useState("");
    
    const getRandomCuisine = () => {
        const currentCuisine = CuisineFilters[Math.floor(Math.random()*CuisineFilters.length)];
        return currentCuisine
    }  
    useEffect(()=>{
      let cuisine = getRandomCuisine()
      const fetchData = async () =>{
        const response= await  fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine.value}&apiKey=${key8}`);
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