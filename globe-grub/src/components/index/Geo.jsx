import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useKey } from "../../hooks/useKey";
//fil som innehåller en array med cuisines respektive länder
import { countryArray } from "../../internal_data/countryArray";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import "./geo.css";


export default function Geo() {
  const [status, setStatus] = useState(null);
  //Hook för sökresultat
  const [searchResult, setSearchResult] = useSearchResult(
    (state) => [state.searchResult, state.setSearchResult],
    shallow
  );
  //Hook för titel på sökresultatscontainer
  const [title, setTitle] = useSearchResult(
    (state) => [state.title, state.setTitle],
    shallow
  );

  //Hook för att bestämma antalet resultat som visas
  const [resultsToShow, setResultsToShow] = useResultsToShow(
    (state) => [state.resultsToShow, state.setResultsToShow],
    shallow
  );
  let cuisine = [];
  let results = [];

  //Hook för att byta API-nyckel
  const key = useKey((state) => state.key);

  //Funktion för att kunna hämta användarens platsinfo (koordinater)
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser!");
    } else {
      setStatus("Loading...");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus(null);
        //Koordinater skickas in i funktionen getCountry
        getCountry(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setStatus("Unable to retrieve your location");
      }
    );
  };

  //Funktion där koordinater skickas in i en URL och sedan hämtas namnet på landet för dom koordinaterna från ett API
  const getCountry = (x, y) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${x},${y}&lang=en-US&apiKey=xJgXFjeLZ4yfhudR_y61uPrN315wNvFoaWitAQHeKpc`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.items.map((x) => {
          //Namnet på landet skickas in i funktionen getCuisine
          getCuisine(x.address.countryName);
        });
      });
  };

  //Funktion där landet användaren befinner sig i jämförs med arrayen med länder och cuisines
  const getCuisine = (currentCountry) => {
    for (const x of countryArray) {
      if (currentCountry == x.value) {
        cuisine.push(x.id);
      }
      //Annars om landet är lika med ett av länderna i arrayer i arrayen så pushas ID:t som är en cuisine till let cuisine
      else {
        if (Array.isArray(x.value) == true) {
          x.value.forEach((i) => {
            if (currentCountry == i) {
              cuisine.push(x.id);
            }
          });
        }
      }
    }
    //Om inget värde pushas till cuisine kommer ett felmeddelande
    if (cuisine.length == 0) {
      console.log("Country doesn't exist in API");
      setSearchResult("maperror");
      //Annars skickas värdet till funktionen fetchCuisine
    } else {
      fetchCuisine(cuisine);
    }

    //If-sats för att sätta en titel på resultatcontainern
    let title = "";
    //Om cuisine är en array (om det finns flera cuisines), gör så att titeln börjar med stor bokstav och har ett "&" tecken mellan varje titel
    if (Array.isArray(cuisine) == true) {
      for (const x of cuisine) {
        title += x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() + " & ";
      }
      setTitle(title.slice(0, -2));
      //Om det bara är en cuisine, gör så att titeln börjar med stor bokstav
    } else {
      setTitle(
        cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase()
      );
    }
  };

  //Funktion där cuisine skickas in och recept hämtas från Spoonacular API:et
  const fetchCuisine = async (cuisine) => {
    var url = "";
    try {
      //Om cuisine är fler än en så hämtas recept baserat på alla cuisines i arrayen
      if (Array.isArray(cuisine) == true) {
        for (const x of cuisine) {
          url = `https://api.spoonacular.com/recipes/random?number=32&tags=${x}&apiKey=${key}`;
          await fetch(url)
            .then((response) => response.json())
            .then((data) => {
              for (const x of data.recipes) {
                results.push(x);
              }
            });
        }
        //Om cuisine är en så hämtas recept baserat på den cuisinen
      } else {
        url = `https://api.spoonacular.com/recipes/random?number=32&tags=${x}&apiKey=${key}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            results.push(data);
          });
      }
    } catch (e) {
      console.log(e);
    }
    //Resultatet skickas till hooken
    setSearchResult(results);
    //8st resultat visas
    setResultsToShow(8);
    console.log(results);
  };

  return (
    <div className="geo-container">
      <NavLink
        to="/"
        type="button"
        className="geo-btn color-accent"
        onClick={getLocation}
      >
        <i className="fa-solid fa-location-dot geo-icon"></i>
      </NavLink>
      <i className="fa-solid fa-arrow-up geo-arrow-icon text-color-primary"></i>
      <i className="fa-solid fa-arrow-left geo-arrow-icon text-color-primary"></i>
      <p className="geo-text text-color-primary">
        Find Recipes matching your region!
      </p>
    </div>
  );
}
