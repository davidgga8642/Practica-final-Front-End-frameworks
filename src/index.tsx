import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root =createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:className" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
