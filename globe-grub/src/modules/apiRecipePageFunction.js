

export const fetchRecipe = async (id,key)=>{
    const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${key}&includeNutrition=true`;

    try{
       
        
        const fetchedData = fetch(url)
        .then((response)=> response.json())
        .then((result)=>{
          if(result != ""){
            return result;
          }
        })
        return fetchedData;
     
        
    }
    catch(e){
        console.log(e);
    }
}
export const fetchSimilarRecipes= async(id,key)=>{
    let similarRecipeData = [];
    let recipeDataTemp = [];
    const similarurl = `https://api.spoonacular.com/recipes/${id}/similar?&addRecipeInformation=true&number=3&information?limitLicense=false&apiKey=${key}&includeNutrition=true`;
    try{

        const fetchedData = fetch(similarurl)
        .then((response)=> response.json())
        .then((result) => {
            if(result != ""){
                result.map((x)=>{
                    fetch(`https://api.spoonacular.com/recipes/${x.id}/information?&apiKey=${key}&includeNutrition=true`)
                    .then((response)=> response.json())
                    .then((result)=> {
                        if(result != ""){
                            similarRecipeData.push(result);
                        }
                    })
                })
                return similarRecipeData;
            }
            
        })
        
       return fetchedData;

        
    }
    catch(e){
        console.log(e);
    }
}