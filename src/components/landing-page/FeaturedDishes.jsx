import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiInstance";
import { Link } from "react-router-dom";
import * as React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function FeaturedDishes() {
  const { data, isPending } = useQuery({
    queryFn: () => api.get("/meals/featured").then((res) => res.data.meals),
    queryKey: ["meals"],
  });
  const dishes = data;

  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Featured Dishes
      </h1>
      <Carousel className="w-3/4 m-auto">
        <CarouselContent className="flex gap-4">
          {dishes?.map((dish, index) => (
            <Link
              to={{
                pathname: `restaurants/${dish.restaurantId}`,
              }}
              key={index}
            >
              {" "}
              <CarouselItem
                key={index}
                className="basis-1/5 border-none shadow-none"
              >
                <Card className="w-full min-w-[300px]  hover:bg-gray-200 transition-all border-none shadow-none ">
                  <img
                    src={dish.image?.secure_url}
                    alt={dish.name}
                    className="w-full h-[160px] object-cover p-2 rounded-3xl"
                  />
                  <CardHeader className="px-4 py-2">
                    <CardTitle>{dish.name}</CardTitle>
                    <CardDescription>
                      <p className="text-sm text-gray-600 ">{dish.desc}</p>
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
