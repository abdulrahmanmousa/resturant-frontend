import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Explore", url: "/explore" },
    { name: "Restaurants", url: "/restaurants" },
    { name: "Offers", url: "/offers" },
  ];
  return (
    <div className="sticky top-0 z-[999] bg-white">
      <div className="flex px-10 gap-9 border-b py-4">
        <div className="flex items-center space-x-4">
          <img src="src/assets/logo.svg" alt="page logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Foodie</h1>
        </div>

        <div className="flex flex-grow justify-end   items-center gap-9">
          {links.map((link, index) => (
            <Link key={index} to={link.url} className="text-lg">
              {link.name}
            </Link>
          ))}
        </div>
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
      </div>
    </div>
  );
}
