
import { useState, useEffect } from "react";
import { useSearchParameters } from "../hooks/useSearchParameters";
import { useRef } from 'react';
import { shallow } from "zustand/shallow";
import FilterMenu  from "./FilterMenu";
import ApiSearchFunction from "./ApiSearchFunction";
export default function Search() {
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [inputParameter, setInputParameter]= useSearchParameters((state) =>
     [state.inputParameter, state.setInputParameter], shallow);
    
    const redirectToApiSearchFunction = ApiSearchFunction();
    const childToParent = (childData) =>{
        setShowFilterMenu(childData);
    }
        
    const ref = useRef(null);
    
    useEffect(() => {
        const Clickout = (e) => {
            if (!ref.current.contains(e.target)) {
                setShowFilterMenu(false);
            }
        };
        document.addEventListener("mousedown", Clickout);
        return () => {
            document.removeEventListener("mousedown", Clickout);
        };        
    });
    
//_________________________________Taggsökning_________________________________//
    // const [tag, setTag] = useTag(
    //     (state) => [state.tag, state.setTag],shallow);
    //Hämtar vald tagg, om värde finns kör useEffect som anropar filterUrl
    // const tagg = useTag.getState((state)=> state.tag);
    
    // useEffect(() => {  
    //     if(tagg.tag != ""){
    //         filterUrl(tagg.tag);
    //     }
    //     console.log("tagg: "+ tagg.tag);
    // }, []);
        // setTag("");
   
//_____________________________________________________________________________//
    
//______________________________Event-handlers_____________________________//
    
    //ClearSearchbar
    const clearSearchBar = () => {
        document.querySelector(".searchbar").value = "";
        setInputParameter("");
    }
    //Set searchinput
    const handleChange = (e) => {     
        setInputParameter(e.target.value);
        console.log(inputParameter)
    }
    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        redirectToApiSearchFunction();
        console.log("Hi")
        // if (searchString != "") {
        //     console.log(searchString);
        //     await filterUrl(searchString);
        // } else {
        //     await filterUrl("");
        // }
    };
    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="searchbar-container background-primary border-color-primary flex-separate">
                    {/* {searchInputArray.map(x => {
                        return(
                            <button type="button" onClick={()=>removeSearchTag(x)}>{x}</button>
                        );
                    })} */}
                    <input
                        className="searchbar text-color-primary"
                        type="text"
                        name="queryvalue"
                        placeholder="Search..."
                        onChange={handleChange}
                    />
                    <div className="flex button-container">
                        {inputParameter != "" ?
                            //knapp med "X" för att rensa sökrutan
                            <button type="button" className="clear-search-btn" onClick={() => clearSearchBar()}>
                                <i class="fa-solid fa-xmark clear-search-icon text-color-primary"></i>
                            </button>
                            :
                            <></>}
                        <button
                            type="submit"
                            className="search-btn color-primary">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        </button>
                        <button
                            type="button"
                            className="slider-btn color-primary" 
                            onClick={() => setShowFilterMenu(!showFilterMenu)}>
                            <i className="fa-solid fa-sliders slider-icon"></i>
                        </button>
                    </div>
                </div>
            </form>
            <FilterMenu childToParent={childToParent} visible={showFilterMenu} refValue={ref}/> 
        </>
    )
    
}
