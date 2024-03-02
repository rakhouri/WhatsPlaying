import Login from "./pages/Login";
import Lead from "./pages/Lead";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lead" element={<Lead />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;