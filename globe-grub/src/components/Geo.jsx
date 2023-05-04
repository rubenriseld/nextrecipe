import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useKey } from "../hooks/useKey";
import { CountryArray } from "./CountryArray";
import { useResultsToShow } from "../hooks/useResultsToShow";

export default function Geo() {
  const [status, setStatus] = useState(null);
  const [searchResult, setSearchResult] = useSearchResult(
    (state) => [state.searchResult, state.setSearchResult],
    shallow
  );
  const [title, setTitle] = useSearchResult(
    (state) => [state.title, state.setTitle],
    shallow
  );

  const [resultsToShow, setResultsToShow] = useResultsToShow(
    (state) => [state.resultsToShow, state.setResultsToShow],
    shallow
  );
  let cuisine = [];
  let results = [];

  const key = useKey((state) => state.key);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser!");
    } else {
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
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${x},${y}&lang=en-US&apiKey=xJgXFjeLZ4yfhudR_y61uPrN315wNvFoaWitAQHeKpc`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.items.map((x) => {
          getCuisine(x.address.countryName);
        });
      });
  };

  const getCuisine = (currentCountry) => {
    for (const x of CountryArray) {
      if (currentCountry == x.value) {
        cuisine.push(x.id);
      } else {
        if (Array.isArray(x.value) == true) {
          x.value.forEach((i) => {
            if (currentCountry == i) {
              cuisine.push(x.id);
            }
          });
        }
      }
    }
    if (cuisine.length == 0) {
      console.log("Country doesn't exist in API");
      setSearchResult("maperror");
    } else {
      fetchCuisine(cuisine);
    }

    let title = "";
    if (Array.isArray(cuisine) == true) {
      for (const x of cuisine) {
        title += x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() + " & ";
      }
      setTitle(title.slice(0, -2));
    } else {
      setTitle(
        cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase()
      );
    }
  };

  const fetchCuisine = async (x) => {
    var url = "";
    try {
      if (Array.isArray(x) == true) {
        for (const y of x) {
          url = `https://api.spoonacular.com/recipes/random?number=10&tags=${y}&apiKey=${key}`;
          await fetch(url)
            .then((response) => response.json())
            .then((data) => {
              for (const x of data.recipes) {
                results.push(x);
              }
            });
        }
      } else {
        url = `https://api.spoonacular.com/recipes/random?number=10&tags=${x}&apiKey=${key}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            results.push(data);
          });
      }
    } catch (e) {
      console.log(e);
    }
    setSearchResult(results);
    setResultsToShow(4);
    console.log(results);
  };

  return (
    <div className="geo-container">
    <NavLink to="/" type="button" className="geo-btn color-accent" onClick={getLocation}>
        <i className="fa-solid fa-location-dot geo-icon"></i>
    </NavLink>
    <i className="fa-solid fa-arrow-up geo-arrow-icon text-color-primary"></i>
    <i className="fa-solid fa-arrow-left geo-arrow-icon text-color-primary"></i>
    <p className="geo-text text-color-primary">Find Recipes matching your region!</p>
</div>
  );
}
