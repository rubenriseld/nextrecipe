
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

    const parameters = useSearchParameters.getState(state => state,shallow);
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
    
    
    
    //_________________________________Taggsökning_________________________________//
    const tagg = useTag.getState((state)=> state.tag);
    const [tag, setTag] = useTag(
        (state) => [state.tag, state.setTag],shallow);
    // Hämtar vald tagg, om värde finns kör useEffect som anropar filterUrl

    
   
//_____________________________________________________________________________//



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
        console.log(parameters.filterParameter);
        fetch(url)
        .then((response) => response.json())
        .then((result)=> {
            //Om söksträng inte är tom och resultat finns
          if(parameters.inputParameter != "" && result.results.length != 0){
            //och om filter också finns
            if(parameters.filterParameter != ""){
                //set title med filtervärden
                setTitle(manipulateTitle())
            }else{
                //annars set title med bara söksträng
                setTitle(parameters.inputParameter);
            }
            setSearchResult(result.results);
          }
     
          //om söksträng och filter är null
          if(parameters.inputParameter == "" && parameters.filterParameter == ""){
            setSearchResult("empty");
          }
          if(parameters.filterParameter != "" && parameters.inputParameter == ""){
            if(result.results.length != 0){
                setTitle(manipulateTitle());
                setSearchResult(result.results);
            }else{
                setTitle(manipulateTitle());
                setSearchResult("empty");
            }
          }

          //om söksträng inte är null och resultat är null
          if(parameters.inputParameter != "" && result.results.length == 0){
            //om filter inte är null 
            if(parameters.filterParameter != ""){
                 //set title med filtervärden
                setTitle(manipulateTitle(parameters.filterParameter))
             }else{
                  //annars set title med bara söksträng
                setTitle(parameters.inputParameter);
            }
            setSearchResult("empty");
          }
          
        })       
    } catch (e) {
        console.log(e);
    }
    setTag("");
    setResultsToShow(8);
    }
   //tar in sökvärden- searchbar input och filterval
   //manipulerar strängen och tar bort alla & och = tecken
   //sättar titeln till resultcontainer från sökning
   //om söksträng från searchbar finns läggs den till först i strängen
    const manipulateTitle=()=>{
        console.log(parameters.filterParameter);
        try{
                let splitFilterParam =parameters.filterParameter.split('&');
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
                if(parameters.inputParameter != ""){
                    tagTitle += parameters.inputParameter;
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
                console.log(tagTitle);
                return tagTitle; 
        }catch(e){
            console.log(e);
        }
    }
    return filterUrl;
}
