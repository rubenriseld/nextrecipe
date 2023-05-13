
import { useEffect } from "react";
import { useKey } from "../hooks/useKey";
import { useSearchResult } from "../hooks/useSearchResult";
import { useTag } from "../hooks/useTag";
import { shallow } from "zustand/shallow";
import { useResultsToShow } from "../hooks/useResultsToShow";
import { useSearchParameters } from "../hooks/useSearchParameters";

export default function ApiSearchFunction(){
    //key som hamnar i url
    const key = useKey((state) => state.key); 
    //söksträng

    const parameters = useSearchParameters.getState(state => state);

    const inputParameter = useSearchParameters.getState(state => state.inputParameter);
    //filterval
    const filterParameters = useSearchParameters.getState(state => state.filterParameter); 
    //setta sökresultat
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    //Setta sök/filter titel
        const [title, setTitle]= useSearchResult((state)=>
        [state.title, state.setTitle],shallow);
    //ange mängd som ska visas "showmore"
    const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow); 
    //taggsökning
    
    
    const tagg = useTag.getState((state)=> state.tag);
    const [tag, setTag] = useTag(
        (state) => [state.tag, state.setTag], shallow);


    //apianrop_______________
    const filterUrl = async () => {
    try {       
        setTitle("")
        let url = "";
        if(tagg.tag != ""){
            url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key}&query=rice&includeIngredients=${tagg.tag}&addRecipeInformation=true${tagg.tag}&number=8`;
        }else{
            url =`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key}&query=${parameters.inputParameter}&includeIngredients=${parameters.inputParameter}&addRecipeInformation=true${parameters.filterParameter}&number=8`;
        } 
        console.log(url);
        console.log(parameters.inputParameter);
        fetch(url)
        .then((response) => response.json())
        .then((result)=> {
            if(inputParameter != ""  & result.results.length != 0){
                // if(filterParameters != "" ){
                //      setTitle(manipulateTitle(filterParameters));
                //     }else{
                //         setTitle(inputParameter);
                //     }
                setSearchResult(result.results)
            }
            if(inputParameter == "" || result.results.length == 0){
                setSearchResult("empty");
                setTitle(inputParameter)
            }
            if(inputParameter =="" && filterParameters != ""){
                setTitle(manipulateTitle(filterParameters));
                setSearchResult(result.results)
            }
        })         
    } catch (e) {
        console.log(e);
    }
    setTag("");
    setResultsToShow(8);
    }
    //manipulera titelsträn BEHÖVER UPPDATERAS_______________________
    const manipulateTitle=()=>{
        console.log(filterParameters);
        let splitFilterParam =filterParameters.split('&');
        let filterGroups = [];
        splitFilterParam.forEach(filter=>{
           let temp= filter.split('=')
           filterGroups.push(temp[1]);
        })
        let filterValues = []
        filterGroups.forEach(filter =>{
            try{
                filterValues.push(filter.split(','));
            }
            catch{
                filterValues.push(filter);
            }
        })
        console.log(filterValues);
        
        let tagTitle = "";
        if(searchInput != ""){
            tagTitle += searchInput;
        }
        filterValues.forEach(filter =>{
            if(Array.isArray(filter)){
               filter.forEach(x=>{  
                if(tagTitle == ""){
                    if(x.charAt(1) == 0 || x.charAt(1) == 5){
                         tagTitle += "Under "+x+" min"
                        }
                        else{
                        tagTitle += x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() 
                    }
                }
                else if(tagTitle != "" ){
                    if(x.charAt(1) == 0 || x.charAt(1) == 5){
                        tagTitle += ", Under "+x+" min"
                    }
                    else{
                        tagTitle += ", "+ x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() 
                    }
                }
               })        
            } 
        })
        return tagTitle;
    }
    //ANROPA FILTERURL _______________________
    return filterUrl;
}
