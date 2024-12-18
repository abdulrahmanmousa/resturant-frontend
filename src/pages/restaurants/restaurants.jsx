import React, { Component } from "react";
import Layout from "../../components/layout/layout";
import { Link, useParams } from "react-router-dom";
import {
  ArrowUpDown,
  Clock,
  DollarSign,
  Star,
  Umbrella,
  UtensilsCrossed,
} from "lucide-react";

// Sample restaurant data
const restaurants = [
  {
    id: "1",
    name: "Pizzeria Delfina",
    rating: "4.5",
    reviews: "1,234",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
    phone: "(415) 123-4567",
    address: "123 Main Street, San Francisco, CA",
    hours: "Mon-Sun: 11:30 AM - 9:30 PM",
    menu: [
      {
        name: "Spinach Dip",
        price: "$12",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Caesar Salad",
        price: "$18",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Grilled Salmon",
        price: "$24",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Filet Mignon",
        price: "$28",
        image: "https://via.placeholder.com/50",
      },
    ],
  },
  {
    id: "2",
    name: "The House",
    rating: "4.3",
    reviews: "980",
    image: "https://images.unsplash.com/photo-1552566626-52b6e06c0211",
    phone: "(415) 987-6543",
    address: "456 Oak Street, San Francisco, CA",
    hours: "Mon-Fri: 12:00 PM - 10:00 PM",
    menu: [
      {
        name: "Bruschetta",
        price: "$10",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Lobster Ravioli",
        price: "$22",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Tiramisu",
        price: "$8",
        image: "https://via.placeholder.com/50",
      },
    ],
  },
  {
    id: "3",
    name: "Gary Danko",
    rating: "4.8",
    reviews: "2,100",
    image: "https://images.unsplash.com/photo-1541557435989-1b96273494f6",
    phone: "(415) 765-4321",
    address: "789 Pine Street, San Francisco, CA",
    hours: "Tue-Sun: 5:00 PM - 11:00 PM",
    menu: [
      {
        name: "Foie Gras",
        price: "$30",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Duck Confit",
        price: "$28",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Chocolate Souffle",
        price: "$15",
        image: "https://via.placeholder.com/50",
      },
    ],
  },
  {
    id: "4",
    name: "Zuni Cafe",
    rating: "4.6",
    reviews: "1,450",
    image: "https://images.unsplash.com/photo-1600891963836-6dc70f4c14f9",
    phone: "(415) 222-3333",
    address: "101 Market Street, San Francisco, CA",
    hours: "Everyday: 11:00 AM - 10:00 PM",
    menu: [
      {
        name: "Wood-Fired Chicken",
        price: "$26",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Oysters",
        price: "$18",
        image: "https://via.placeholder.com/50",
      },
      {
        name: "Panna Cotta",
        price: "$9",
        image: "https://via.placeholder.com/50",
      },
    ],
  },
];

export default function Restaurants() {
  return (
    <Layout>
      <div className="bg-white min-h-screen px-8 py-4  m-auto justify-center items-center w-3/4">
        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Clock size={18} />
            <span>Open Now</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Umbrella size={18} />
            <span>Outdoor Seating</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <UtensilsCrossed size={18} />
            <span>Cuisine Type</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Star size={18} />
            <span>Rating</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <DollarSign size={18} />
            <span>Price</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ArrowUpDown size={18} />
            <span>Sort By</span>
          </button>
        </div>

        {/* Restaurant List */}
        <h2 className="text-xl font-bold mb-4">All restaurants</h2>
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`}>
              <div
                key={restaurant.id}
                className="flex items-center justify-between p-4  rounded hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{restaurant.name}</h3>
                    <p className="text-gray-500">
                      ⭐ {restaurant.rating} ({restaurant.reviews})
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xl">›</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
