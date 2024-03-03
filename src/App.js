import Login from "./pages/Login";
import Lead from "./pages/Lead";
import Home from "./pages/Home";
// import Script from "./pages/Script";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
      {/* <Route path="/" element={<Script />} /> */}
        <Route path="/lead" element={<Lead />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
