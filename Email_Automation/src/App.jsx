import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecentMail from "./components/RecentMail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recent-mail" element={<RecentMail />} />
      </Routes>
    </Router>
  );
}

export default App;
