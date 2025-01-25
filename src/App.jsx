import React from "react";
import { Routes, Route, HashRouter, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./pages/user/landing-page/landing-page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Restaurants from "./pages/user/restaurants/restaurants";
import Restaurant from "./pages/user/restaurants/restaurant/restaurant";
import CreateRestaurant from "./pages/owner/restaurants/create-restaurant";
import AdminReservations from "./pages/owner/reservations/reservations";
import UserReservations from "./pages/user/reservations/reservations";
import UpdatePassword from "./pages/auth/update-password";
import ForgetPassword from "./pages/auth/forget-password";
import Profile from "./pages/auth/profile";
import Explore from "./pages/user/explore/explore";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerMeals from "./pages/owner/meals/OwnerMeals";
import Reviews from "./pages/owner/reviews/Reviews";
import Tables from "./pages/owner/tables/Tables";
import UserReviews from "./pages/user/reviews/UserReviews";

// Define the Users component
function Users() {
  return <Outlet />; // Renders child routes
}

function App() {
  const queryClient = new QueryClient();
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Main Routes */}
          <Route
            path="/owner/restaurants/create"
            element={<CreateRestaurant />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/users" element={<Users />}>
            <Route path="reset-password" element={<UpdatePassword />} />
          </Route>
          <Route path="/forgot_password" element={<ForgetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<Restaurant />} />
            <Route path="/owner/reservations" element={<AdminReservations />} />
            <Route path="/owner/meals" element={<OwnerMeals />} />
            <Route path="/user/reviews" element={<Reviews />} />
            <Route path="/owner/reviews" element={<UserReviews />} />

            <Route path="/owner/tables" element={<Tables />} />

            <Route path="/user/reservations" element={<UserReservations />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Routes>
        <Toaster richColors />
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
