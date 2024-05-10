import "./assets/css/App.css";

import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { REGEX_PATH, SAVED_PATH } from "./constansts";
import router from "./routes";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    if (REGEX_PATH.test(location.pathname)) {
      localStorage.setItem(SAVED_PATH, location.pathname);
    }
  }, [location]);

  return (
    <Routes>
      {router.map((it, idx) => (
        <Route key={idx} path={it.path} element={it.element} />
      ))}
    </Routes>
  );
};

export default App;
