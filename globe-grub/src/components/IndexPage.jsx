import Geo from "./Geo";
import Search from "./Search";
import ResultContainer from "./ResultContainer";
import Ad from "./Ad";

import React, { useState } from "react";
import { useSearchResult } from "../hooks/useSearchResult";
import { useRecommendation } from "../hooks/UseRecommendations";

export default function IndexPage() {

  
  const data = useSearchResult((state) => state.searchResult);
  // if(data == null){
  //   data = useRecommendation((state) => state.recoResults)
  // }
  console.log(data)
  
  // const data = (useSearchResult((state) => state.searchResult) === []) :
  //   ( useSearchResult((state) => state.searchResult) == []){
      
  //     data? useRecommendation((state) => state.recoResults) : useSearchResult((state) => state.searchResult
  //     )
  //   }
  //   else (
  //     data = useSearchResult((state) => state.searchResult
  //     ))
  //     console.log(data)
    //sökresultaten hämtas när searchResult-staten ändras i Search-komponenten

      


  return (
    <>
      <section className="geosearch flex-center background-secondary max-width-container">
        <Geo/>
        <Search/> 
      </section>
      <Ad /> 
      <ResultContainer data={data} />; {/*data från Search.jsx(data från sökningen) hamnar i resultcontainer */}
      <Ad />
    </>
  );
}
