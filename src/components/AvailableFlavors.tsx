import { Progress } from "radix-ui";
import React from "react";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Fetch real data for flavors and their usage
const AvailableFlavors = () => {
  const progress = 70; // Example progress value

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "2px 10px",
        }}
      >
        <span style={{ fontWeight: "bold", width: "150px" }}>
          Available Flavors
        </span>
        <div
          style={{
            height: "15px",
            width: "15px",
            borderRadius: "0.25rem",
            background: "green",
          }}
        />
        <span>= Free</span>
        <div
          style={{
            height: "15px",
            width: "15px",
            borderRadius: "0.25rem",
            background: "blue",
          }}
        />
        <span>= Used</span>
        <div
          style={{
            height: "15px",
            width: "15px",
            borderRadius: "0.25rem",
            background: "red",
          }}
        />
        <span>= Limit exceeded</span>
      </div>
      <ul>
        <li style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold" }}>Tiny:</span>
          <Progress.Root className="ProgressRoot" value={progress}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </li>
        <li style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold" }}>Small:</span>
          <Progress.Root className="ProgressRoot" value={progress}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </li>
        <li style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold" }}>Middle:</span>
          <Progress.Root className="ProgressRoot" value={progress}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </li>
        <li style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold" }}>Big:</span>
          <Progress.Root className="ProgressRoot" value={progress}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </li>
        <li style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold" }}>Giant:</span>
          <Progress.Root className="ProgressRoot" value={progress}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </li>
      </ul>
    </div>
  );
};

export default AvailableFlavors;
