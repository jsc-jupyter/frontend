import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style/main.css";
import "./style/theme.css";

const container = document.getElementById("react-home-hook");
const root = createRoot(container!);
root.render(<App />);
