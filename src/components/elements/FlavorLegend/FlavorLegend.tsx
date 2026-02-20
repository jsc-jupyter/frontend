import React from "react";
import "./FlavorLegend.css";

const LEGEND_ITEMS = [
  { className: "flavor-legend__box--free", label: "Free" },
  { className: "flavor-legend__box--used", label: "Used" },
  { className: "flavor-legend__box--exceeded", label: "Limit exceeded" },
] as const;

const FlavorLegend = () => {
  return (
    <div className="flavor-legend">
      <span className="flavor-legend__title">Available Flavors</span>
      <div className="flavor-legend__items">
        {LEGEND_ITEMS.map((item) => (
          <React.Fragment key={item.label}>
            <div className={`flavor-legend__box ${item.className}`} />
            <span className="flavor-legend__label">= {item.label}</span>
            <span className="flavor-legend__spacer" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlavorLegend;
