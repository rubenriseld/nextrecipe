export const fetchRecipe = async (id,key)=>{
    // let similarRecipeData = [];
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


export const fetchSimilarRecipes = async (id,key)=>{
    // let similarRecipeData = [];
    const url = `https://api.spoonacular.com/recipes/${id}/similar?&addRecipeInformation=true&number=3&information?limitLicense=false&apiKey=${key}&includeNutrition=true`;
    // const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${key}&includeNutrition=true`;
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