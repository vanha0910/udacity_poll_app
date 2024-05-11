import "./assets/css/App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import router from "./routes";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {router.map((it, idx) => (
            <Route key={idx} path={it.path} element={it.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
