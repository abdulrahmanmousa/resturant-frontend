import { useNavigate } from "react-router-dom";
import api from "@/lib/apiInstance";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Star } from "lucide-react";
export default function FeaturedRestaurant({ restaurantId }) {
  const { data, isPending } = useQuery({
    queryFn: () =>
      api
        .get(`/restaurants/${restaurantId}`)
        .then((res) => res.data.restaurant),
    queryKey: ["restaurant", restaurantId],
  });

  const restaurant = data;

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (isPending) return <p>Loading...</p>;
  if (!restaurant) return <p>Restaurant not found</p>;
  return (
    <div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden w-1/2  ">
      {/* Restaurant Image */}
      <div className="relative">
        <img
          src={restaurant?.profileImage?.secure_url}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <p className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-lg text-sm">
          Featured
        </p>
      </div>

      {/* Restaurant Details */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{restaurant.name}</h3>
        <p className="text-gray-600 mt-2">{restaurant.address}</p>

        {/* Ratings */}
        <div className="flex items-center mt-4">
          <Star className="text-red-500" size={20} />
          <p className="text-gray-700 font-bold ml-2">
            {restaurant.avgRating?.toFixed(1)}
          </p>
        </div>

        {/* CTA Button */}
        <button
          className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-lg shadow-md hover:bg-red-700 transition"
          onClick={() => navigate(`/restaurants/${restaurantId}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
