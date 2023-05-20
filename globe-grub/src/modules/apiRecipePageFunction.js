

export const fetchRecipe = async (id,key)=>{
    const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${key}&includeNutrition=true`;

    try{
        let recipeData = [];
        
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
export function fetchSimilarRecipes(){
    const similarurl = `https://api.spoonacular.com/recipes/${id}/similar?&addRecipeInformation=true&number=3&information?limitLicense=false&apiKey=${key}&includeNutrition=true`;
    
}