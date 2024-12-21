import { Link } from "react-router-dom";
import * as React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FeaturedDishes() {
  const dishes = [
    {
      name: "Grilled Steak",
      description: "Perfectly cooked with spices",
      image:
        "https://img.freepik.com/free-photo/grilled-steak-vegetables_2829-16635.jpg",
    },
    {
      name: "Seafood Pasta",
      description: "Rich and creamy seafood delight",
      image:
        "https://img.freepik.com/free-photo/delicious-seafood-pasta_1220-5226.jpg",
    },
    {
      name: "Sushi Platter",
      description: "Fresh and authentic sushi",
      image:
        "https://img.freepik.com/free-photo/fresh-sushi-set_176420-219.jpg",
    },
    {
      name: "Vegan Salad",
      description: "Healthy and full of flavor",
      image:
        "https://img.freepik.com/free-photo/vegan-salad-with-fresh-vegetables_2829-19288.jpg",
    },
    {
      name: "Cheesecake",
      description: "Smooth and delicious dessert",
      image:
        "https://img.freepik.com/free-photo/slice-cheesecake-with-fruits_2829-13216.jpg",
    },
  ];

  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Featured Dishes
      </h1>
      <Carousel className="w-3/4 m-auto">
        <CarouselContent className="flex gap-4">
          {dishes.map((dish, index) => (
            <Link
              to={{
                pathname: `/dishs/${dish.id}`,
                state: { dish },
              }}
              key={index}
            >
              {" "}
              <CarouselItem
                key={index}
                className="basis-1/5 border-none shadow-none"
              >
                <Card className="w-full  hover:bg-gray-200 transition-all border-none shadow-none ">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-[160px] object-cover p-2 rounded-3xl"
                  />
                  <CardHeader className="px-4 py-2">
                    <CardTitle>{dish.name}</CardTitle>
                    <CardDescription>
                      <p className="text-sm text-gray-600 text-center">
                        Experience world-class dining.
                      </p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
