import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

export default function Swiper() {
  return (
    <div className="flex justify-center items-center ">
      <Carousel className="relative w-full ">
        {" "}
        {/* Adjust height here */}
        <CarouselContent className="flex overflow-hidden h-full">
          {" "}
          {/* Ensure content takes full height */}
          <CarouselItem className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gray-200">
            <img
              src="https://img.freepik.com/free-psd/realistic-fast-food-template-design_23-2149623421.jpg" // Adjusted path
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gray-300">
            Slide 2
          </CarouselItem>
          <CarouselItem className="flex-shrink-0 w-full h-full flex items-center justify-center bg-gray-400">
            Slide 3
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer" />
      </Carousel>
    </div>
  );
}
