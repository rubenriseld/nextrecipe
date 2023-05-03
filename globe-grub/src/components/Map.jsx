import { useState, useEffect } from "react";

import React from 'react' 
import World from "@svg-maps/world";
import {SVGMap} from 'react-svg-map';
/*import 'react-svg-map/lib/index.css'*/
export default function Map() {
  const [name, setName] = useState("");
  const [coords, setCoords] = useState({x: 0, y: 0});

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

  return (
    <>
     <SVGMap onLocationClick={(e)=>{
      console.log(e.target.id,   e.target.getAttribute('name'));


     }} 
     
    onLocationMouseOver={(e)=>{
      console.log(e.target.getAttribute('name'));
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
