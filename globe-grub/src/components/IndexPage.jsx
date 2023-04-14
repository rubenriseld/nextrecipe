import Geo from "./Geo";
import Search from "./Search";
import ResultContainer from "./ResultContainer";
import Ad from "./Ad";

import React, { useState } from "react";

export default function IndexPage() {
  const [data, setData] = useState(["Mediterranean", "Scandinavian"]);

  const childToParent = (childData) => {
    setData(childData);
  };

  return (
    <>
      <section className="geosearch flex-center background-secondary max-width-container">
        <Geo></Geo>
        <Search childToParent={childToParent}></Search>
      </section>
      <Ad />
      <ResultContainer data={data} />;
      <Ad />
    </>
  );
}
