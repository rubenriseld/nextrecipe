import Geo from "./Geo";
import Search from "./Search";
import ResultContainer from "./ResultContainer";
import Ad from "./Ad";

import React, { useState } from "react";
import { useSearchResult } from "../hooks/useSearchResult";

export default function IndexPage() {
    const data = useSearchResult((state) => state.searchResult);
    //sökresultaten hämtas när searchResult-staten ändras i Search-komponenten


  return (
    <>
      <section className="geosearch flex-center background-secondary max-width-container">
        <Geo/>
        <Search/> 
      </section>
      <Ad />
      <ResultContainer data={data} /> {/*data från Search.jsx(data från sökningen) hamnar i resultcontainer */}
      <Ad />
    </>
  );
}
