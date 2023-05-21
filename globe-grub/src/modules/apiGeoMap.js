import { countryArray  } from "../internal_data/countryArray";


export const getCuisine = async (key, currentCountry) => {
     let cuisinesOfCurrentCountry = [];

    for (const country of countryArray) {
      if (currentCountry == country.value) {
        cuisinesOfCurrentCountry.push(country.id);
      }
      
      //Annars om landet är lika med ett av länderna i arrayer i arrayen så pushas ID:t som är en cuisine till let cuisine
      else {
        if (Array.isArray(country.value) == true) {
          country.value.forEach((i) => {
            if (currentCountry == i) {
              cuisinesOfCurrentCountry.push(country.id);
            }
          });
        }
      }
    }
    //Om inget värde pushas till cuisine kommer ett felmeddelande
    if (cuisinesOfCurrentCountry.length == 0) {
      console.log("Country doesn't exist in API");
      return ["maperror", null];
      //Annars skickas värdet till funktionen fetchCuisine
    } else {
      const fetched = fetchCuisine(key, cuisinesOfCurrentCountry);
      return fetched;
    }
  };


  //Funktion där cuisine skickas in och recept hämtas från Spoonacular API:et
  export const fetchCuisine = async (key, cuisines) => {
    let url = "";
    let results = [];
    try {
      //Om cuisine är fler än en så hämtas recept baserat på alla cuisines i arrayen
      if (Array.isArray(cuisines) == true) {
        for (const cuisine of cuisines) {
          url = `https://api.spoonacular.com/recipes/random?number=32&tags=${cuisine}&apiKey=${key}`;
          await fetch(url)
            .then((response) => response.json())
            .then((data) => {
              for (const recipe of data.recipes) {
                results.push(recipe);
              }
            });
          }
        //Om cuisine är en så hämtas recept baserat på den cuisinen
      } else {
        url = `https://api.spoonacular.com/recipes/random?number=32&tags=${cuisines}&apiKey=${key}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            results.push(data);
          });
        }
      } catch (e) {
        console.log(e);
      }
      
      return [results, cuisines];
      
  };