import { useState, useEffect } from "react";
import React from "react";
import World from "@svg-maps/world"; //npm paket med världskarta
import { SVGMap } from "react-svg-map"; //npm paket med världskarta
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useKey } from "../hooks/useKey";
import { useNavigate } from "react-router-dom";
//fil som innehåller en array med cuisines respektive länder
import { countryArray  } from "../internal_data/countryArray";
import { useResultsToShow } from "../hooks/useResultsToShow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; //npm paket som innehåller enkla funktioner för att zooma/pana/pincha
import * as apiGeoFunctions from "../modules/apiGeoMap";

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
            onLocationClick={async (e) => {
              const result = await apiGeoFunctions.getCuisine(key, e.target.getAttribute("name"))
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
