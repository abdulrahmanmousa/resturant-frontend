import React from "react";
import Layout from "../../../../components/layout/layout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Phone, Clock } from "lucide-react";
import ImagesModal from "../../../../components/modals/PreviewImagesModal";
import api from "../../../../lib/apiInstance";
import BookTable from "../../../../components/restaurant/BookTable";
import PageLoading from "../../../../components/PageLoading";
import { useState, useEffect } from "react";

import { RestaurantMealsModal } from "../../../../components/Restaurant/MealsModal";
import RestaurantReviews from "../../../../components/Restaurant/RestaurantReviews";
export default function Restaurant() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryFn: () =>
      api.get(`/restaurants/${id}`).then((res) => res.data.restaurant),
    queryKey: ["restaurant", id],
  });

  const restaurant = data;

  // Example ratings and tables data
  const ratings = [
    { label: 5, percentage: 40 },
    { label: 4, percentage: 30 },
    { label: 3, percentage: 20 },
    { label: 2, percentage: 5 },
    { label: 1, percentage: 5 },
  ];

  const [menu, setmenu] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/meals/restaurant/${id}?limit=5`, {
        headers: {
          token: localStorage.getItem("token"), // Include token in headers
        },
      })
      .then((response) => {
        setmenu(response.data.meals); // Assuming `meals` is the key in the response
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching meals:",
          error.response?.data || error.message,
        );
        setLoading(false);
      });
  }, []);
  return (
    <Layout>
      {isPending ? (
        <PageLoading />
      ) : (
        <div className="bg-white p-8 m-auto justify-center items-center w-3/4">
          {/* Restaurant Header */}
          <div className="relative mb-6">
            <img
              src={restaurant.profileImage.secure_url}
              alt={restaurant.name}
              className="w-full h-64 object-cover rounded-md"
            />
            <h1 className="absolute bottom-4 left-4 text-white text-4xl font-bold">
              {restaurant.name}
            </h1>
          </div>

          {/* Overview Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p className="text-gray-700">
              {restaurant.name} is a popular restaurant located at{" "}
              {restaurant.address}. Known for its friendly staff, great
              atmosphere, and delicious menu, it’s a perfect spot for dining
              anytime during its operating hours: {restaurant.openingHours}.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="bg-white space-y-8">
            <ImagesModal
              attachments={restaurant.galleryImages.map(
                (img) => img.secure_url,
              )}
            />

            {/* Contact Information */}
            <div className="grid grid-rows-2 gap-6 m-6">
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-700" size={24} />
                <div>
                  <p className="font-bold">{restaurant.phone}</p>
                  <p className="text-gray-500">{restaurant.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-gray-700" size={24} />
                <div>
                  <p className="font-bold">Hours</p>
                  <p className="text-gray-500">{restaurant.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <h2 className="text-2xl font-bold m-6">Menu</h2>
          <div className="grid grid-cols-2 gap-4">
            {menu?.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 border p-4 rounded-xl shadow-sm"
              >
                <img
                  src={item.image.secure_url}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.price}$</p>
                </div>
              </div>
            ))}
            <RestaurantMealsModal restaurantId={id} />
          </div>
          <BookTable />
          <RestaurantReviews restaurantId={id} />
        </div>
      )}
    </Layout>
  );
}
