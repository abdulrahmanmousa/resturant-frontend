import React from "react";

export default function FoodType() {
  const buttons = [
    { id: 1, label: "Japanese", imgSrc: "/path/to/japanese.jpg" },
    { id: 2, label: "Chinese", imgSrc: "/path/to/chinese.jpg" },
    { id: 3, label: "Egyptian", imgSrc: "/path/to/egyptian.jpg" },
    { id: 4, label: "Italian", imgSrc: "/path/to/italian.jpg" },
    { id: 5, label: "Mexican", imgSrc: "/path/to/mexican.jpg" },
    { id: 6, label: "Indian", imgSrc: "/path/to/indian.jpg" },
    { id: 7, label: "French", imgSrc: "/path/to/french.jpg" },
    { id: 8, label: "Thai", imgSrc: "/path/to/thai.jpg" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {buttons.map((button) => (
        <button
          key={button.id}
          className="relative w-full h-40 bg-gray-200 rounded-lg overflow-hidden"
        >
          <img
            src={button.imgSrc}
            alt={button.label}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
            {button.label}
          </span>
        </button>
      ))}
    </div>
  );
}
