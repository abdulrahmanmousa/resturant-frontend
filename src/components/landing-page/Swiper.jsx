import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Img1 from "../../assets/c1.png";
import Img2 from "../../assets/c2.png";
import Img3 from "../../assets/c3.png";
import Img4 from "../../assets/c4.png";

export default function Swiper() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const navigate = useNavigate();
  const onFindTable = () => {
    navigate(`/explore?q=${search}`);
  };

  return (
    <div className="relative flex m-auto justify-center items-center w-3/4 overflow-hidden rounded-2xl max-h-[60vh]">
      {/* Text overlay */}
      <div className="absolute top-3/4 z-[10] left-8 transform -translate-y-3/4 text-white p-4 space-y-4 rounded-md">
        <h1 className="text-[48px] text-white font-bold ">
          Find your Table for any occasion
        </h1>
        <p className="text-white text-lg">
          Discover the perfect spot for every event, from date night to a
          birthday celebration
        </p>
        <div className="relative max-w-2xl w-full">
          <div className="flex items-center bg-white rounded-2xl shadow-md py-1 px-2">
            <div className="flex items-center pl-4 flex-grow h-[66px] ">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onFindTable()}
                type="text"
                placeholder="Search for restaurants"
                className="w-full px-3 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
            <button
              onClick={onFindTable}
              className="px-6 py-2 bg-red-500 text-white h-[52px] rounded-2xl hover:bg-red-600 transition-colors m-1"
            >
              Find a table
            </button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[5]"></div>

      {/* Slider content */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${totalSlides * 100}%`,
        }}
      >
        <div className="relative w-full flex-shrink-0">
          <img
            src={Img1}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full flex-shrink-0">
          <img
            src={Img2}
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full flex-shrink-0">
          <img
            src={Img3}
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full flex-shrink-0">
          <img
            src={Img4}
            alt="Slide 4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
