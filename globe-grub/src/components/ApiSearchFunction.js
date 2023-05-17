import { UrlParameters } from "./FilterArrays";

    //api-anrop_______________
    export const fetchRecipes = async (key, tag) => {
        console.log("fetching")
        try {  
            let filterParameters = "";
            let searchParameter = "";
            let url = "";
        
            if(tag != null){
                url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key}&includeIngredients=${tag}&addRecipeInformation=true${tag}&number=16`;
            }else{
                try {
                    filterParameters = getActiveFilters();
                    searchParameter = document.querySelector('.searchbar').value;
                } catch {
                    console.log("couldn't find parameters");
                }
                url =`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${key}&query=${searchParameter}&includeIngredients=${searchParameter}&addRecipeInformation=true${filterParameters}&number=16`;
            } 
            console.log("url: " + url);

            const fetchedData = fetch(url)
                .then((response) => response.json())
                .then((data)=> {
                    console.log(data);

                    if(tag != null){
                        return([data.results, tag]);
                    }
                    //om det saknas både sök- och filterparametrar returneras en tom sökning
                    //för att visa ett felmeddelande
                    else if(!searchParameter && !filterParameters){
                        console.log("empty search");
                        return(["empty", searchParameter, filterParameters]);   
                    }
                    //dehär händer när för många filter eller sökord angivits, vi vill ha med orden o filter i titel
                    else if(data.results.length == 0 || data.results == undefined){
                        console.log("no result"); 
                        return(["empty", searchParameter, filterParameters]);   
                    }
                    else{
                        //returnera sök- och filterparametrar för felhantering och titel över sökresultat
                        return [data.results, searchParameter, filterParameters];
                    }
                }).catch((e)=> {
                    console.log(e);
                }
            );
            return fetchedData;   
        } catch (e) {
            console.log(e + " nu blev de fel");
        }
    }

   //tar in sökvärden- searchbar input och filterval
   //manipulerar strängen och tar bort alla & och = tecken
   //sättar titeln till resultcontainer från sökning
   //om söksträng från searchbar finns läggs den till först i strängen
   export function manipulateTitle(searchParameter, filterParameters){
        try{
            let resultTitle = "";
            let filterValues = [];

            //lägger till sökordet i resultattiteln om sökrutan inte är tom
            if(searchParameter != ""){
                resultTitle += searchParameter;
            }

            //om filterparametrarna inte är tomma
            if(filterParameters != "" || filterParameters == undefined){
                //splitta filterParametrarna vid "&" för att dela upp i grupper
                let splitFilterParameters = filterParameters.split('&');
                let filterGroups = [];
                splitFilterParameters.forEach(filter=>{
                    let temp= filter.split('=')
                    filterGroups.push(temp[1]);
                })
                filterGroups.forEach(filter =>{
                    //splitta grupperna vid , och lägg in i en array
                    try{
                        filterValues.push(filter.split(','));
                    }
                    catch{
                        filterValues.push(filter);
                    }
                })
            }
            
            //hantera de manipulerade filterparametrarna
            if(filterValues != ""){
                filterValues.forEach(filter =>{
                    if(Array.isArray(filter)){
                        filter.forEach(x=>{  
                        if(resultTitle == ""){
                            if(x.charAt(1) == 0 || x.charAt(1) == 5){
                                    resultTitle += "Under " + x + " min"
                                }
                                else{
                                resultTitle += x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() 
                            }
                        }
                        else if(resultTitle != "" ){
                            if(x.charAt(1) == 0 || x.charAt(1) == 5){
                                resultTitle += ", Under " + x + " min"
                            }
                            else{
                                resultTitle += ", " + x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() 
                            }
                        }
                        });        
                    } 
                });
            }
            return resultTitle; 
        } catch(e) {
            console.log(e);
        }
    }

    //hämta filterparametrar från alla aktiverade filterknappar i filtermenyn
    export function getActiveFilters() {
        let buttons = document.querySelectorAll('.active-btn');
        let cuisineParameter = "";
        let dietParameter = "";
        let maxTimeParameter = "";
        let mealTypeParameter = "";
        let intoleranceParameter = "";

        //hämtar filtertypen från knapparnas data-type för att skapa strängarna till URL:en
        buttons.forEach(btn => {   
            switch(btn.dataset.type){
                case "C":
                    if(cuisineParameter == ""){
                        cuisineParameter += UrlParameters[0] + btn.value;
                    }else{
                        cuisineParameter += "," + btn.value; //&intolerances= grain, egg, 
                    }
                    break;
                case "D":
                    if(dietParameter == ""){
                        dietParameter += UrlParameters[1] + btn.value;
                    }else{
                        dietParameter += "," + btn.value;
                    }
                    break;
                case "T":
                    if(maxTimeParameter == ""){
                        maxTimeParameter += UrlParameters[2] + btn.value;
                    }else{
                        maxTimeParameter += "," + btn.value;
                    }
                    break;
                case "M":
                    if( mealTypeParameter == ""){
                        mealTypeParameter += UrlParameters[3] + btn.value;
                    }else{
                        mealTypeParameter += "," + btn.value;
                    }
                    break;
                case "I":
                    if(intoleranceParameter == ""){
                        intoleranceParameter += UrlParameters[4] + btn.value;
                    }else{
                        intoleranceParameter += "," + btn.value;
                    }
                    break;
                default:
                    break;
            }});
            let filterParameters = `${cuisineParameter}${dietParameter}${maxTimeParameter}${mealTypeParameter}${intoleranceParameter}`;
            return filterParameters;
        }
        
        
        
        //     if (btn.dataset.type == "C" & cuisineString == "") {
        //         cuisineString += state.cuisine + btn.value
        //     } else if (btn.dataset.type == "C" & cuisineString != "") {
        //         cuisineString += "," + btn.value
        //     }
        //     else if (btn.dataset.type == "D" & dietString == "") {
        //         dietString += state.diet + btn.value
        //     } else if (btn.dataset.type == "D" & dietString != "") {
        //         dietString += "," + btn.value
        //     }
        //     else if (btn.dataset.type == "M" & mealtypeString == "") {
        //         mealtypeString += state.type + btn.value
        //     } else if (btn.dataset.type == "M" & mealtypeString != "") {
        //         mealtypeString += "," + btn.value
        //     }
        //     else if (btn.dataset.type == "I" & intoleranceString == "") {
        //         intoleranceString += state.intolerances + btn.value
        //     } else if (btn.dataset.type == "I" & intoleranceString != "") {
        //         intoleranceString += "," + btn.value
        //     }
        //     else if (btn.dataset.type == "T" & timeString == "") {
        //         timeString += state.maxReadyTime + btn.value
        //     } else if (btn.dataset.type == "T" & timeString != "") {
        //         timeString += "," + btn.value
        //     }
        // });
       









     //Om söksträng inte är tom och resultat finns
        //   if(searchParameter != "" && result.results.length != 0){
        //     //och om filter också finns
        //     if(filterParameters != ""){
        //         //set title med filtervärden
        //         setTitle(manipulateTitle(searchParameter, filterParameters))
        //     }else{
        //         //annars set title med bara söksträng
        //         setTitle(searchParameter);
        //     }
        //     setSearchResult(result.results);
        //     console.log("search result: ")
        //     console.log(result.results);
        //   }
     
        //   //om söksträng och filter är null
        //   if(searchParameter == "" && filterParameters == ""){
        //     setSearchResult("empty");
        //   }
        //   if(filterParameters != "" && searchParameter == ""){
        //     if(result.results.length != 0){
        //         setTitle(manipulateTitle(searchParameter, filterParameters));
        //         setSearchResult(result.results);
        //     }else{
        //         setTitle(manipulateTitle(searchParameter, filterParameters));
        //         setSearchResult("empty");
        //     }
        //   }

        //   //om söksträng inte är null och resultat är null
        //   if(searchParameter != "" && result.results.length == 0){
        //     //om filter inte är null 
        //     if(filterParameters != ""){
        //          //set title med filtervärden
        //         setTitle(manipulateTitle(filterParameters))
        //      }else{
        //           //annars set title med bara söksträng
        //         setTitle(searchParameter);
        //     }
        //     setSearchResult("empty");
        //   }
          