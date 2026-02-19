import { StrictMode } from "react";
import FilterBlock from "./components/FilterBlock";
import Table from "./components/Table";
import SSEHandler from "./components/SSEHandler";
import { registerAll } from "./registry/registerAll";

registerAll();

const App = () => {
  return (
    <StrictMode>
      <div className="home-container">
        <FilterBlock />
        <Table />
        <div style={{ margin: 5 }}></div>
        <TableBuilder />
        <SSEHandler />
        <ServiceTables
          frontendConfig={window.getFrontendConfig()}
          pageType="home"
        />
      </div>
    </StrictMode>
  );
};

export default App;
