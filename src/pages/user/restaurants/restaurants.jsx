import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../../../components/layout/layout";
import api from "../../../lib/apiInstance";
import {
  ArrowUpDown,
  Clock,
  DollarSign,
  Star,
  Umbrella,
  UtensilsCrossed,
} from "lucide-react";
import PageLoading from "../../../components/PageLoading";

// Motion variants (placeholders for animation logic)
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

export default function Restaurants() {
  const { data, isPending, error } = useQuery({
    queryFn: async () =>
      await api.get("/restaurants").then((res) => res.data.data.restaurants),
    queryKey: ["restaurants"],
  });

  if (error) return <div>Error loading restaurants</div>;

  return (
    <Layout>
      {isPending ? (
        <PageLoading />
      ) : (
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
            {data &&
              Array.isArray(data) &&
              data.map((restaurant, index) => (
                <Link
                  to={`/restaurants/${restaurant._id}`}
                  key={restaurant._id}
                >
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
                        src={restaurant.profileImage.secure_url}
                        alt={restaurant.name}
                        className="w-12 h-12 rounded object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      />
                      <div>
                        <h3 className="text-lg font-bold">{restaurant.name}</h3>
                        <p className="text-gray-500">{restaurant.address}</p>
                        <p className="text-gray-500">
                          ⭐ {restaurant.avgRating || 0} (
                          {restaurant.categories.join(", ") || "No categories"})
                        </p>
                        <p className="text-sm text-gray-400">
                          {restaurant.openingHours}
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
      )}
    </Layout>
  );
}
