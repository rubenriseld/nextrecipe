import { useState, useEffect } from "react";
import React from 'react' 
import World from "@svg-maps/world";
import {SVGMap} from 'react-svg-map';
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useKey } from "../hooks/useKey";
import { useNavigate } from "react-router-dom";
import { CountryArray  } from "./CountryArray";
import { useResultsToShow } from "../hooks/useResultsToShow";



export default function Map() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [searchResult, setSearchResult] = useSearchResult(
    (state) => [state.searchResult, state.setSearchResult],
    shallow
  );
  const [title, setTitle]= useSearchResult((state)=>
      [state.title, state.setTitle],shallow);

const [resultsToShow, setResultsToShow] = useResultsToShow(
(state) => [state.resultsToShow, state.setResultsToShow],
shallow
);

  const key = useKey((state) => state.key);

  let cuisine = [];
  let results = [];

  useEffect(() => {
    const handleWindowMouseMove = event => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);
  
  const getCuisine = (currentCountry) => {

    for (const x of CountryArray){
      if(currentCountry == x.value){
        cuisine.push(x.id);
      }
      else{
        if (Array.isArray(x.value) == true){
          x.value.forEach(i => {
            if (currentCountry == i){
              cuisine.push(x.id);
            }
          })
        }
      }
    }
    if (cuisine.length == 0){
      console.log("Country doesn't exist in API")
    }else{
      fetchCuisine(cuisine);
    }
  
  let title ="";
  if (Array.isArray(cuisine) == true){
    for(const x of cuisine){   
     
      title +=  x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() + ' & ';
    }
    setTitle(title.slice(0, -2));
  }else{
    setTitle(cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase());
  }
  }; 

  const fetchCuisine = async (x) => {
    var url = "";
     try {
      if (Array.isArray(x) == true){
        for (const y of x){
          url = `https://api.spoonacular.com/recipes/random?number=10&tags=${y}&apiKey=${key}`; 
       await fetch(url)
       .then((response) => response.json())
       .then((data) => {
        for (const x of data.recipes){
          results.push(x);
        }
       })
        }
      }else{
        url = `https://api.spoonacular.com/recipes/random?number=10&tags=${x}&apiKey=${key}`;  
       await fetch(url)
       .then((response) => response.json())
       .then((data) => {
          results.push(data);
       })
      }
    } catch (e) {
      console.log(e);
    }
    setSearchResult(results);
    setResultsToShow(4);
    console.log(results);
  }
  return (
    <>
     <SVGMap onLocationClick={(e)=>{
       getCuisine(e.target.getAttribute('name'));
       navigate("/");
      }} 
      
    onLocationMouseOver={(e)=>{
      setName(e.target.getAttribute('name'));
    }}
    
    onLocationMouseMove={(e)=>{
      let infobox = document.querySelector('#infobox');
      infobox.style.display = "inline";
      infobox.style.top = coords.y + "px";
      infobox.style.left = coords.x + "px";
      
    }} 
    onLocationMouseOut={()=>{
      let infobox = document.querySelector('#infobox');
      infobox.style.display = "none";
    }} className="svg-map svg-map__location " map={World}/>

     <div id="infobox" className="background-primary">
      {name}

     </div>
    </>    
  );
}
