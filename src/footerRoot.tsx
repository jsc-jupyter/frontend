import React from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer/Footer";
import "./style/embla.css";

const container = document.getElementById("react-footer-hook");
const root = createRoot(container!);
root.render(<Footer />);
