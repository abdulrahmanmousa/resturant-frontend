import React from "react";
import Layout from "../../components/layout/layout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Phone, Clock, UtensilsCrossed } from "lucide-react";
import DateTimePicker from "../../components/DateTimePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import ImagesModal from "../../components/modals/PreviewImagesModal";
import api from "../../lib/apiInstance";
import TableAvailability from "../../components/restaurant/TableAvailability";
import BookTable from "../../components/restaurant/BookTable";

export default function Restaurant() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      api.get(`/restaurants/${id}`).then((res) => res.data.restaurant),
    queryKey: ["restaurant", id],
  });

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (error || !data) {
    return <h1 className="text-center text-red-500">Restaurant Not Found</h1>;
  }

  const restaurant = data;

  // Example ratings and tables data
  const ratings = [
    { label: 5, percentage: 40 },
    { label: 4, percentage: 30 },
    { label: 3, percentage: 20 },
    { label: 2, percentage: 5 },
    { label: 1, percentage: 5 },
  ];

  const tables = [
    { id: "1", name: "Table 1", capacity: 4 },
    { id: "2", name: "Table 2", capacity: 6 },
    { id: "3", name: "Table 3", capacity: 2 },
    { id: "4", name: "Table 4", capacity: 8 },
  ];
  const menu = [
    {
      name: "Margherita Pizza",
      price: "$15.99",
      image: "https://example.com/images/margherita.jpg",
    },
    {
      name: "Cheeseburger",
      price: "$12.49",
      image: "https://example.com/images/cheeseburger.jpg",
    },
    {
      name: "Caesar Salad",
      price: "$9.99",
      image: "https://example.com/images/caesar-salad.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      price: "$14.99",
      image: "https://example.com/images/carbonara.jpg",
    },
    {
      name: "Chocolate Cake",
      price: "$6.99",
      image: "https://example.com/images/chocolate-cake.jpg",
    },
  ];

  return (
    <Layout>
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
            attachments={restaurant.galleryImages.map((img) => img.secure_url)}
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
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start space-x-8 py-10 ">
          {/* Categories */}
          {/* {restaurant.categories?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Categories</h2>
              <div className="flex flex-wrap space-x-4">
                {restaurant.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-200 rounded-full text-gray-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )} */}
          {/* Left Column: Overall Rating */}
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold text-gray-800">
              {restaurant.avgRating.toFixed(1)}
            </h2>
            <div className="flex text-red-500 text-2xl mb-1">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  {restaurant.avgRating >= index + 1
                    ? "★"
                    : restaurant.avgRating >= index + 0.5
                    ? "☆"
                    : "☆"}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm">1,234 reviews</p>
          </div>
          {/* Right Column: Rating Bars */}
          <div className="flex-1 space-y-2  ">
            {ratings.map((rating) => (
              <div key={rating.label} className="flex items-center space-x-2">
                {/* Rating Number */}
                <p className="text-gray-700 font-semibold w-4 text-right">
                  {rating.label}
                </p>

                {/* Progress Bar */}
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>

                {/* Percentage */}
                <p className="text-gray-500 text-sm w-8">
                  {rating.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* taple Availability */}
        <TableAvailability />

        {/* Table Booking Section */}
        {/* <div className="mt-8 w-2/4 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
          <form className="space-y-4">
            <DateTimePicker />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose guest count" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <SelectItem key={count} value={count}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600">
              Find a Table
            </button>
          </form>
        </div> */}
        <BookTable />
      </div>
    </Layout>
  );
}
