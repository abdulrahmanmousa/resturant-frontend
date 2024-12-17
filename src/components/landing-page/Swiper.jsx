import React, { useState, useEffect } from "react";

export default function Swiper() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative flex m-auto justify-center items-center w-3/4 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${totalSlides * 100}%`,
        }}
      >
        <div className="relative w-full flex-shrink-0">
          <img
            src="/src/assets/c1.png"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-black/50 p-4 rounded-md">
            <h1 className="text-4xl text-white font-bold mb-2">
              Find your Table for any occasion
            </h1>
            <p className="text-white text-lg">
              Discover the perfect spot for every event, from date night to a
              birthday celebration
            </p>
          </div>
        </div>
        <div className="relative w-full flex-shrink-0">
          <img
            src="/src/assets/c2.png"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full flex-shrink-0">
          <img
            src="/src/assets/c3.png"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full flex-shrink-0">
          <img
            src="/src/assets/c4.png"
            alt="Slide 4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
