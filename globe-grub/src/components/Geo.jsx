import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Geo(){
    const [status, setStatus] = useState(null);
    const [country, setCountry] = useState(null);
   
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
           getCountry(position.coords.latitude, position.coords.longitude);
           },
           () => {
           setStatus("Unable to retrieve your location");
               }   
           );  
       };

       const getCountry = (x, y) => {
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${x},${y}&lang=en-US&apiKey=xJgXFjeLZ4yfhudR_y61uPrN315wNvFoaWitAQHeKpc`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.items.map((x) =>{
                setCountry(x.address.countryName)
            })
        })
       }


    return(
        <div className="geo-container">
            <NavLink to="/" type="button" className="geo-btn color-accent" onClick={getLocation}>
                <i className="fa-solid fa-location-dot geo-icon"></i>
            </NavLink>
            <div className="geo-text-container">

            <p className="geo-text text-color-primary">Find Recipes matching your region!</p>
            
            {/* Only for testing */}
            <p className="text-color-primary"> 
                
                <br/>
                Country: {status} {country}
            </p>
            </div>
        </div>
    )
}
