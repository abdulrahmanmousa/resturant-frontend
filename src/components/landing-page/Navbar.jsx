import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="block">
      <div className="flex p-2" style={{ margin: "13px" }}>
        <div className="flex items-center space-x-4">
          <img
            src="src/assets/restaurant-svgrepo-com.png"
            alt="page logo"
            className="w-16 h-16"
          />
          <h1 className="text-xl font-bold">Foodie</h1>
        </div>

        <div className="flex-grow flex justify-end space-x-20">
          <Link to="/restaurants" className="text-lg">
            restaurants
          </Link>
          <a href="/help" className="text-lg">
            Help
          </a>
          <Link to="/login" className="text-lg">
            <Button className="text-lg">Sign in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
