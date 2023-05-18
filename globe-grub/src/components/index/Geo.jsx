import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useKey } from "../../hooks/useKey";
//fil som innehåller en array med cuisines respektive länder
import { countryArray } from "../../internal_data/countryArray";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import * as apiGeoFunctions from "../modules/apiGeoMap";
import "./geo.css";


// import { getCuisine } from ""

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
  const getCountry = async (x, y) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${x},${y}&lang=en-US&apiKey=xJgXFjeLZ4yfhudR_y61uPrN315wNvFoaWitAQHeKpc`;
    const fetchedCountry = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
          return data.items[0].address.countryName;
    });
    const result = await apiGeoFunctions.getCuisine(key, fetchedCountry);
    setResultsToShow(8);
    setSearchResult(result[0]);

    //If-sats för att sätta en titel på resultatcontainern
    let title = "";
    //Om cuisine är en array (om det finns flera cuisines), gör så att titeln börjar med stor bokstav och har ett "&" tecken mellan varje titel
    if (Array.isArray(result[1]) == true) {
      for (const cuisine of result[1]) {
        title += cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase() + " & ";
      }
      setTitle(title.slice(0, -2));
    //Om det bara är en cuisine, gör så att titeln börjar med stor bokstav
    } else {
      setTitle(
        result[1].charAt(0).toUpperCase() + result[1].slice(1).toLowerCase()
      );
    }
  }

    // //Resultatet skickas till hooken
    // //8st resultat visas
    // setResultsToShow(8);
    // console.log(results);
  

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
