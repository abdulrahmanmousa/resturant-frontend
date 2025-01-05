import useAuthStore from "../../store/auth-store";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg";

export default function Navbar() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Explore", url: "/explore" },
    { name: "Restaurants", url: "/restaurants" },
    { name: "Offers", url: "/offers" },
  ];

  const { user, setUser } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-[20] bg-white">
      <div className="flex px-10 gap-9 border-b py-4">
        <Link to={"/"} className="flex items-center space-x-2 text-red-600">
          <span className="text-2xl font-bold font-OkineSans">Ihjiz</span>{" "}
          <span>|</span>
          <span className="text-2xl font-bold font-Arab">احجز</span>
        </Link>

        <div className="flex flex-grow justify-end   items-center gap-9">
          {links.map((link, index) => (
            <Link key={index} to={link.url} className="text-lg">
              {link.name}
            </Link>
          ))}
        </div>
        {!user ? (
          <div className=" flex items-center justify-end gap-4">
            <Link to="/login" className="text-lg">
              <Button size={"lg"} className="text-lg bg-[#EB2930] text-white">
                Sign in
              </Button>
            </Link>

            <Link to="/register" className="text-lg">
              <Button size={"lg"} className="text-g" variant={"secondary"}>
                Sign up
              </Button>
            </Link>
          </div>
        ) : (
          <div className=" flex items-center justify-end gap-4">
            <Link to="/profile" className="text-lg">
              <img
                src={user?.image?.secure_url}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
            <Button
              onClick={() => handleLogout()}
              size={"lg"}
              className="text-g"
              variant={"secondary"}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
