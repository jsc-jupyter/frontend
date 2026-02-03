import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header";
import "./style/main.css";

const container = document.getElementById("react-header-hook");
const root = createRoot(container!);
root.render(<Header />);
