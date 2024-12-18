import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./pages/login/login";
import LandingPage from "./pages/landing-page/landing-page";
import Restaurants from "./pages/restaurants/restaurants";
import Restaurant from "./pages/restaurant/restaurant";
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
