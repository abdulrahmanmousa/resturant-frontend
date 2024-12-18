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
import { Link } from "react-router-dom";

export function Recommended_res() {
  const restaurants = [
    {
      id: "1",
      name: "Pizzeria Delfina",
      rating: "4.5",
      reviews: "1,234",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
      phone: "(415) 123-4567",
      address: "123 Main Street, San Francisco, CA",
      hours: "Mon-Sun: 11:30 AM - 9:30 PM",
      menu: [
        {
          name: "Spinach Dip",
          price: "$12",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Caesar Salad",
          price: "$18",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Grilled Salmon",
          price: "$24",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Filet Mignon",
          price: "$28",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "2",
      name: "The House",
      rating: "4.3",
      reviews: "980",
      image: "https://images.unsplash.com/photo-1552566626-52b6e06c0211",
      phone: "(415) 987-6543",
      address: "456 Oak Street, San Francisco, CA",
      hours: "Mon-Fri: 12:00 PM - 10:00 PM",
      menu: [
        {
          name: "Bruschetta",
          price: "$10",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Lobster Ravioli",
          price: "$22",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Tiramisu",
          price: "$8",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "3",
      name: "Gary Danko",
      rating: "4.8",
      reviews: "2,100",
      image: "https://images.unsplash.com/photo-1541557435989-1b96273494f6",
      phone: "(415) 765-4321",
      address: "789 Pine Street, San Francisco, CA",
      hours: "Tue-Sun: 5:00 PM - 11:00 PM",
      menu: [
        {
          name: "Foie Gras",
          price: "$30",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Duck Confit",
          price: "$28",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Chocolate Souffle",
          price: "$15",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      id: "4",
      name: "Zuni Cafe",
      rating: "4.6",
      reviews: "1,450",
      image: "https://images.unsplash.com/photo-1600891963836-6dc70f4c14f9",
      phone: "(415) 222-3333",
      address: "101 Market Street, San Francisco, CA",
      hours: "Everyday: 11:00 AM - 10:00 PM",
      menu: [
        {
          name: "Wood-Fired Chicken",
          price: "$26",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Oysters",
          price: "$18",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Panna Cotta",
          price: "$9",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
  ];

  return (
    <div className="mt-14">
      <h1 className=" text-4xl font-bold mb-6 text-center text-gray-800">
        Recommended Restaurants
      </h1>
      <Carousel className="w-3/4 m-auto">
        <CarouselContent className="flex gap-4">
          {restaurants.map((restaurant, index) => (
            <Link
              to={{
                pathname: `/restaurants/${restaurant.id}`,
                state: { restaurant },
              }}
              key={index}
            >
              {" "}
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
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
