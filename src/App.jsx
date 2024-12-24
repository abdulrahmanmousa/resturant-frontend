import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./pages/login/login";
import LandingPage from "./pages/landing-page/landing-page";
import Restaurants from "./pages/restaurants/restaurants";
import Restaurant from "./pages/restaurant/restaurant";
import SingUp from "./pages/signup/SignUP";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import UpdatePassword from "./pages/updatepassowrd/UpdatePassword";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/explore.jsx";
import Profile from "./pages/profile/Profile.jsx";
function App() {
  const queryClient = new QueryClient();
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SingUp />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<Restaurant />} />
          <Route path="/forgot_password" element={<ForgetPassword />} />
          <Route path="/update_password" element={<UpdatePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </HashRouter>
  );
}

//
export default App;
