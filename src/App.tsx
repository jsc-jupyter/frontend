import React, { StrictMode } from "react";
import FilterBlock from "./components/FilterBlock";
import Table from "./components/Table";
import SSEHandler from "./components/SSEHandler";

const App = () => {
  return (
    <StrictMode>
      <div className="home-container">
        <FilterBlock />
        <Table />
        <SSEHandler />
      </div>
    </StrictMode>
  );
};

export default App;
