import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Geo(){
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
   
    const getLocation = () => {
       if (!navigator.geolocation) {
           setStatus("Geolocation is not supported by your browser!");
           } 
       else {
                
       setStatus("Loading...");
           }
           navigator.geolocation.getCurrentPosition(
           (position) => {
           setStatus(null);
           setLat(position.coords.latitude);
           setLng(position.coords.longitude);
           },
           () => {
           setStatus("Unable to retrieve your location");
               }   
           );  
       };


    return(
        <div className="geo-container">
            <NavLink to="/" type="button" className="geo-btn color-accent" onClick={getLocation}>
                <i className="fa-solid fa-location-dot geo-icon"></i>
            </NavLink>
            <p className="geo-text">Find Recipes matching your region!</p>
            
            {/* Only for testing */}
            <p> 
                {status}
                <br/>
                Long: {lng}
                <br/>
                Lat: {lat}
            </p>
        </div>
    )
}

