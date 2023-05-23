import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SVGMap } from "react-svg-map"; //npm paket med världskarta
import World from "@svg-maps/world"; //npm paket med världskarta
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; //npm paket som innehåller enkla funktioner för att zooma/pana/pincha
import { useSearchResult } from "../../hooks/useSearchResult";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { shallow } from "zustand/shallow";
import * as apiGeoFunctions from "../../modules/apiGeoMap";
import { apiKey } from "../../internal_data/apiKey";
import "./map.css";

//komponent för kartan på "around the world"-sidan, där användare kan klicka på land för att
//söka på recept som matchar vald region
export default function Map() {
    const key = apiKey;

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
        <>
        <h1 className="country-title">Click on a country to see recipes</h1>
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
                            if(confirm(`Search for recipes matching ${e.target.getAttribute("name")}?`)){
                                const result = await apiGeoFunctions.getCuisine(key, e.target.getAttribute("name"))
                                setResultsToShow(8);
                                console.log(result[0])
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
                                } else if (result [1] != null) {
                                    setTitle(
                                        result[1].charAt(0).toUpperCase() + result[1].slice(1).toLowerCase()
                                    );
                                }
                                else{
                                    setTitle("null");
                                }
                                navigate("/");
                            } else {
                                return
                            }
                            
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
        </>
    );
}
