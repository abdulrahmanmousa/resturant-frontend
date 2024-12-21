import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./pages/login/login";
import LandingPage from "./pages/landing-page/landing-page";
import Restaurants from "./pages/restaurants/restaurants";
import Restaurant from "./pages/restaurant/restaurant";
import SingUp from "./pages/signup/SignUP";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SingUp />} />

        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/forgot_password" element={<ForgetPassword />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
