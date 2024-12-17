import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Recommended_res() {
  const restaurants = [
    {
      name: "La Pergola",
      description: "Italian $$ · 4.7",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
    },
    {
      name: "The Capital Grille",
      description: "American $$$ · 4.8",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      name: "Le Meurice",
      description: "French $$ · 4.8",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    },
    {
      name: "Rosa's Thai Cafe",
      description: "Thai $$ · 4.7",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },
    {
      name: "Manila Bay Bistro",
      description: "Filipino $$ · 4.8",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
  ];

  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Recommended Restaurants
      </h1>
      <Carousel className="w-3/4 m-auto">
        <CarouselContent className="flex gap-4">
          {restaurants.map((restaurant, index) => (
            <CarouselItem key={index} className="basis-1/5">
              <Card className="w-full shadow-md hover:scale-105 transition-transform">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-[140px] object-cover rounded-t-md"
                />
                <CardHeader>
                  <CardTitle>{restaurant.name}</CardTitle>
                  <CardDescription>{restaurant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    Experience world-class dining.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
