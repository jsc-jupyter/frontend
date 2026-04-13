import { StrictMode } from "react";
import FilterBlock from "./components/FilterBlock";
import Table from "./components/Table";
import SSEHandler from "./components/SSEHandler";

const App = () => {
  return (
    <StrictMode>
      <main className="home-container">
        <FilterBlock />
        <Table />
        <div style={{ margin: 5 }}></div>
        <SSEHandler />
      </main>
    </StrictMode>
  );
};

export default App;
