import React from "react";

// StarRating Component to display stars dynamically
function StarRating({ rating }) {
  const starImage = "/src/assets/star.png"; // Path to the star image
  const starSize = 20; // Size of the star image (width x height)

  return (
    <div className="flex items-center">
      {Array.from({ length: rating }, (_, index) => (
        <span className="flex text-red-500 text-2xl mb-1">★ </span>
      ))}
    </div>
  );
}

// Rates Component to display the reviews
export default function Rates() {
  const reviews = [
    {
      name: "loay ",
      daysAgo: "2 days ago",
      rating: 1,
      comment: "bad service",
    },
    {
      name: "Mousa Mousa",
      daysAgo: "5 days ago",
      rating: 5,
      comment: "The atmosphere was really nice and the food was delicious",
    },
    {
      name: "Tayf",
      daysAgo: "1 week ago",
      rating: 2,
      comment: "Absolutely loved it!",
    },
  ];

  return (
    <div className="w-3/4 m-auto mt-14">
      <h1 className="text-4xl font-bold mb-6 text-center  text-gray-800">
        What our diners are saying
      </h1>
      {reviews.map((review, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h2 className="font-bold text-lg">{review.name}</h2>
          <p className="text-sm text-gray-500">{review.daysAgo}</p>
          {/* Star Rating */}
          <StarRating rating={review.rating} />
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
