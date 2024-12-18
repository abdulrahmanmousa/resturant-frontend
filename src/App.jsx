import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/landing-page/landing-page";
import Restaurants from "./pages/Restaurants/Restaurants";
import Restaurant from "./pages/restaurant/Restaurant";
function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants" element={<Restaurants />} />

        {/* Dynamic Route for Specific Restaurant */}
        <Route path="/restaurants/:id" element={<Restaurant />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
