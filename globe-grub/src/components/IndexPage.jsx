import Geo from "./Geo";
import Search from "./Search";
import ResultContainer from "./ResultContainer";
import Ad from "./Ad";

import React, { useState } from "react";

export default function IndexPage() {
  const [data, setData] = useState([]);

  const childToParent = (childData) => {
    setData(childData);
    //result.results hamnar i data via useState (setData)
  };

  return (
    <>
      <section className="geosearch flex-center background-secondary max-width-container">
        <Geo></Geo>
        <Search childToParent={childToParent}></Search>
      </section>
      <Ad />
      <ResultContainer data={data} />; {/*data från Search.jsx(data från sökningen) hamnar i resultcontainer */}
      <Ad />
    </>
  );
}
