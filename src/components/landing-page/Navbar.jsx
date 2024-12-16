import React from "react";
import { Button } from "@/components/ui/button";

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
          <a href="/browse" className="text-lg">
            Browse
          </a>
          <a href="/help" className="text-lg">
            Help
          </a>
          <Button href="/signup" className="text-lg">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
