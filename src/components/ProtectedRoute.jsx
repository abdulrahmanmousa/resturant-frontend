import useAuthStore from "../store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuthStore();
  console.log(user?.role, user?.restaurant);
  if (user?.role === "restaurantOwner" && !user?.restaurant) {
    return <Navigate to="/owner/restaurants/create" />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
