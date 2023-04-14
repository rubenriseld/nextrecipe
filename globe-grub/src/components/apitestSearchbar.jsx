import React, {useState} from 'react';
import {Link} from "react-router-dom"

export default function SearchBar(){
const [searchInput, setSerchInput] = useState("");
const [recipeData, setData] = useState([]);
const getUrl = async () => {
  
   const url= `https://api.spoonacular.com/recipes/complexSearch?&apiKey=85ce5287879e42978484fcf300dace17&query=${searchInput}&includeIngredients=${searchInput}&number=10`;
   try{
    const response = await fetch(url);
    const result = await response.json();
    setData(result.results);
   }
   catch(e){
    console.log(e);
   }
}

const handleChange = (e) => {
    e.preventDefault();
    setSerchInput(e.target.value);
};
const handleSubmit = (e) => {
    e.preventDefault();
    getUrl();
}

return (
    <div className='searchbar '>
      <form onSubmit={handleSubmit} >
  <input type="text" placeholder='search here' onChange={handleChange} value={searchInput}></input>
      </form>
    {recipeData.map((recipe)=>{
        return(    
              <ul> 
                  <Link to={`recipes/${recipe.id}`}>
                    <li key={recipe.id}>    {recipe.title}</li>
                     </Link>   
            </ul>       
        )
        console.log(recipe)
    })}
    
    </div>
)
}