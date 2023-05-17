import { useState, useEffect } from "react";
import React from "react";
import World from "@svg-maps/world"; //npm paket med världskarta
import { SVGMap } from "react-svg-map"; //npm paket med världskarta
import { useSearchResult } from "../../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useKey } from "../../hooks/useKey";
import { useNavigate } from "react-router-dom";
//fil som innehåller en array med cuisines respektive länder
import { countryArray  } from "../../internal_data/countryArray";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; //npm paket som innehåller enkla funktioner för att zooma/pana/pincha

export default function Map() {
  //En const som används för att navigera till en del på sidan
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
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

  //Hook för att byta API-nyckel
  const key = useKey((state) => state.key);

  let cuisine = [];
  let results = [];

  //Funktion för att se muspekarens koordinater
  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  //Funktion där landet användaren befinner sig i jämförs med arrayen med länder och cuisines
  const getCuisine = (currentCountry) => {
    //Om landet är lika med landet i arrayen så pushas ID:t som är en cuisine till let cuisine
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
    <div className="map-container">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={1}
        defaultPositionY={1}
      >
        <TransformComponent>
          <SVGMap
            //När landet på kartan klickas på, så skickas namnet på landet till funktionen getCuisine och sedan navigeras sidan till "start" där receptkorten visas
            onLocationClick={(e) => {
              getCuisine(e.target.getAttribute("name"));
              navigate("/");
            }}
            //När musen hålls över ett land på kartan så "setas" namnet
            onLocationMouseOver={(e) => {
              setName(e.target.getAttribute("name"));
            }}
            //En "inforuta" visas beroende på vilka koordinater musen har
            onLocationMouseMove={(e) => {
              let infobox = document.querySelector("#infobox");
              infobox.style.display = "inline";
              infobox.style.top = coords.y + "px";
              infobox.style.left = coords.x + "px";
            }}
            onLocationMouseOut={() => {
              let infobox = document.querySelector("#infobox");
              infobox.style.display = "none";
            }}
            className="svg-map svg-map__location "
            map={World}
          />
        </TransformComponent>
      </TransformWrapper>
      <div id="infobox" className="background-primary">
        {name}
      </div>
    </div>
  );
}
