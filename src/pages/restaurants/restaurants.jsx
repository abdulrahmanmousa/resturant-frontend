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
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const filterButtonVariants = {
  initial: { opacity: 0, x: -20 },
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1],
      delay: i * 0.1,
    },
  }),
};

const listItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      delay: i * 0.1,
    },
  }),
};
const filterButtons = [
  { icon: Clock, text: "Open Now" },
  { icon: Umbrella, text: "Outdoor Seating" },
  { icon: UtensilsCrossed, text: "Cuisine Type" },
  { icon: Star, text: "Rating" },
  { icon: DollarSign, text: "Price" },
  { icon: ArrowUpDown, text: "Sort By" },
];

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
      <motion.div
        className="bg-white min-h-screen px-8 py-4 m-auto justify-center items-center w-3/4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Filters */}
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {filterButtons.map((button, index) => (
            <motion.button
              key={button.text}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
              variants={filterButtonVariants}
              custom={index}
              whileTap={{ scale: 0.97 }}
            >
              <button.icon size={18} />
              <span>{button.text}</span>
            </motion.button>
          ))}
        </div>

        {/* Restaurant List */}
        <motion.h2
          className="text-xl font-bold mb-4"
          variants={filterButtonVariants}
        >
          All restaurants
        </motion.h2>
        <div className="space-y-4">
          {restaurants.map((restaurant, index) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <motion.div
                className="flex items-center justify-between p-4 rounded hover:shadow-md transition-all duration-200"
                variants={listItemVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                  <div>
                    <h3 className="text-lg font-bold">{restaurant.name}</h3>
                    <p className="text-gray-500">
                      ⭐ {restaurant.rating} ({restaurant.reviews})
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-400 text-xl">›</span>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
