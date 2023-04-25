import { shallow } from "zustand/shallow";
import { useRecommendation } from "../hooks/UseRecommendations";
import { useEffect } from "react";
import { CuisineFilters} from "./FilterItems";

export default function Recommendations(){

    const key5 = "8fbd9413e79a49bfaa909d68f22e0476";
    const key1 = "e50fb6304553492781cba43da8b4bc7f";
    
    const [recoResults, setRecoResults] = useRecommendation((state) =>
    [state.recoResults, state.setRecoResults], shallow);
    
    
    const getRandomCuisine = () => {
        const currentCuisine = CuisineFilters[Math.floor(Math.random()*CuisineFilters.length)];
        return(
            currentCuisine.value
        )
    }
    
    useEffect(()=>{
        let cuisine = getRandomCuisine()
        const fetchData = async () =>{
          const response = await fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine}&apiKey=${key1}`)
          const result = await response.json();
          setRecoResults(result.results);
          console.log(result);
        }
    
      fetchData();
        // const test = useRecommendation.getState((state)=> state.recoResults)
        // console.log(test)
      },[]);

      
      return(
        <>
        </>
      )

    // useEffect(() => {
    //     let cuisine = getRandomCuisine()
    //     fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine}&apiKey=${key1}`)
    //     .then((response) => response.json())
    //     .then((result) => setRecoResults(result.cuisine[0])),
    //     console.log(result),
    //     console.log(cuisine)
    
    // }, []);
}    