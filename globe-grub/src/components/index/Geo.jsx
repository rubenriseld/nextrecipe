import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../../hooks/useSearchResult";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { shallow } from "zustand/shallow";
import * as apiGeoFunctions from "../../modules/apiGeoMap";
import { apiKey } from "../../internal_data/apiKey";
import "./geo.css";

//komponent för geo-sektionen, knapp som hämtar recept baserat på position
export default function Geo() {
    const key = apiKey;

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

    
    //Funktion för att kunna hämta användarens platsinfo (koordinater)
    const getLocation = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser!");
        } else {
            console.log("Loading...");
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(null);
                //Koordinater skickas in i funktionen getCountry
                getCountry(position.coords.latitude, position.coords.longitude);
            },
            () => {
                console.log("Unable to retrieve your location");
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
        //hämta recept som matchar landets cuisines
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
