import { useEffect, useState } from "react";
import { cuisineFilters } from "../../internal_data/filterArrays";
import ResultContainer from "./ResultContainer";
import { apiKey } from "../../internal_data/apiKey";
import "./recommendations.css";

// komponent för slumpmässigt genererade recept som dyker upp på startsidan
export default function Recommendations() {
    //hook för API-nyckel
    const key = apiKey;

    //data som skickas in till resultcontainer
    const [recommendationData, setRecommendationData] = useState([]);
    const [cuisineTitle, setCuisineTitle] = useState("");

    //random funktion som slumpar fram 1 cuisine med 4 resultat i resultcontainer
    const getRandomCuisine = () => {
        const currentCuisine = cuisineFilters[Math.floor(Math.random() * cuisineFilters.length)];
        return currentCuisine
    }
    useEffect(() => {
        let cuisine = getRandomCuisine()
        const fetchData = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?number=4&tags=${cuisine.value}&apiKey=${key}`);
            const result = await response.json();
            setRecommendationData(result.recipes);
            setCuisineTitle(cuisine.name);
        }
        fetchData();
    }, [])
    return (
        <>
            <ResultContainer data={recommendationData} cuisineTitle={cuisineTitle} isReco={true}></ResultContainer>
        </>
    )
}    