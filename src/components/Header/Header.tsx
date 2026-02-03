import React, { StrictMode } from "react";
import ThemePicker from "../ThemePicker";
import jscLogo from "../../../images/header/jsc.png";
import jupyterLogo from "../../../images/header/jupyterjsc.png";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Extract components/styles where applicable
const Header = () => {
  return (
    <StrictMode>
      <div className="header">
        <img src={jscLogo} width={335} alt="Jupyter Logo" />
        <div className="header-links">
          <a className="header-link" href="/">
            Home
          </a>
          <a
            className="header-link"
            href="https://jupyterjsc.pages.jsc.fz-juelich.de/docs/jupyterjsc/"
          >
            Documentation
          </a>
          <a className="header-link" href="/hub/admin">
            Admin
          </a>
          <a className="header-link" href="">
            Credits
          </a>
          <ThemePicker />
        </div>
        <div
          style={{
            marginLeft: "auto",
            paddingRight: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={jupyterLogo} height={60} alt="JSC Logo" />
          <h1>Logout</h1>
        </div>
      </div>
    </StrictMode>
  );
};

export default Header;
