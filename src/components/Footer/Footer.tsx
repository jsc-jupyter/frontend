import React, { StrictMode } from "react";
import Carousel from "./Carousel";
import { EmblaOptionsType } from "embla-carousel";
import helmholtzLogo from "../../../images/footer/helmholtz.png";

const Footer = () => {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
  };

  return (
    <StrictMode>
      <div className="footer-container">
        <div className="footer-top">
          <Carousel options={OPTIONS} />
        </div>
        <div className="footer-bottom">
          <a className="footer-link-text" href="https://www.fz-juelich.de/">
            © Forschungszentrum Jülich
          </a>
          <div style={{ flexGrow: 1 }}>
            <a className="footer-link-text" href="/hub/imprint">
              Legal Notice
            </a>
            <span> | </span>
            <a className="footer-link-text" href="/hub/privacy">
              Privacy Policy
            </a>
            <span> | </span>
            <a className="footer-link-text" href="/hub/terms">
              Terms of Service
            </a>
          </div>
          <div>
            <a href="https://www.helmholtz.de/en/">
              <img src={helmholtzLogo} width={220} alt="Hemholtz Logo" />
            </a>
          </div>
        </div>
      </div>
    </StrictMode>
  );
};

export default Footer;
