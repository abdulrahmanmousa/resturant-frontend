import api from "../../lib/apiInstance";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/layout/layout";
import React, { memo, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Umbrella,
  UtensilsCrossed,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Animation variants
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
  {
    icon: Clock,
    text: "Open Now",
    param: "isOpen",
    options: [
      { value: "true", label: "Open Now" },
      { value: "false", label: "All Restaurants" },
    ],
  },
  {
    icon: UtensilsCrossed,
    text: "Cuisine Type",
    param: "cuisine",
    options: [
      { value: "desserts", label: "Desserts" },
      { value: "drinks", label: "Drinks" },
      { value: "main", label: "Main Course" },
      { value: "appetizers", label: "Appetizers" },
    ],
  },
  {
    icon: Star,
    text: "Rating",
    param: "minRating",
    options: [
      { value: "4", label: "4+ Stars" },
      { value: "3", label: "3+ Stars" },
      { value: "2", label: "2+ Stars" },
      { value: "1", label: "1+ Stars" },
    ],
  },
  {
    icon: DollarSign,
    text: "Price",
    param: "priceRange",
    options: [
      { value: "low", label: "$ (Low)" },
      { value: "medium", label: "$$ (Medium)" },
      { value: "high", label: "$$$+ (High)" },
    ],
  },
  {
    icon: ArrowUpDown,
    text: "Sort By",
    param: "sortBy",
    options: [
      { value: "rating", label: "Rating: High to Low" },
      { value: "reviewCount", label: "Most Reviewed" },
      { value: "priceAsc", label: "Price: Low to High" },
      { value: "priceDesc", label: "Price: High to Low" },
    ],
  },
];

// Memoized Select Component
const AnimatedSelect = memo(({ filter, value, onValueChange, custom }) => (
  <motion.div
    variants={filterButtonVariants}
    initial="initial"
    animate="animate"
    custom={custom}
    className="min-w-[140px]"
    layout
    layoutId={filter.param}
  >
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full border-gray-200 rounded-xl focus:ring-red-500">
        <div className="flex items-center gap-2">
          <filter.icon className="h-4 w-4" />
          <SelectValue placeholder={filter.text} />
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="all">All {filter.text}</SelectItem>
        {filter.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </motion.div>
));

AnimatedSelect.displayName = "AnimatedSelect";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  // Memoize getFilterValue function
  const getFilterValue = useCallback(
    (param) => searchParams.get(param) || "",
    [searchParams],
  );

  // Memoize updateFilters function
  const updateFilters = useCallback(
    (key, value) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";

      navigate({ search: query });
    },
    [navigate, searchParams],
  );

  // Debounced search update
  const debouncedUpdateSearch = (val) => updateFilters("q", val);

  // Fetch restaurants with filters
  const { data: response, isPending } = useQuery({
    queryKey: ["restaurants", ...Array.from(searchParams.entries())],
    queryFn: () => api.get(`/restaurants?${searchParams.toString()}`),
  });

  const restaurants = response?.data?.data?.restaurants || [];

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-gray-50"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <motion.input
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  value={getFilterValue("q")}
                  onChange={(e) => debouncedUpdateSearch(e.target.value)}
                  placeholder="Search for restaurants, cuisines, or dishes"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div className="flex gap-3 overflow-x-auto py-2" layout>
                  {filterButtons.map((filter, index) => (
                    <AnimatedSelect
                      key={filter.param}
                      filter={filter}
                      value={getFilterValue(filter.param)}
                      onValueChange={(value) =>
                        updateFilters(filter.param, value)
                      }
                      custom={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 max-w-7xl mx-auto px-4 py-6">
          <motion.div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow p-4">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                {["Desserts", "Main Course", "Beverages", "Appetizers"].map(
                  (cat) => (
                    <label key={cat} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="category"
                        className="form-radio h-4 w-4 text-red-500"
                        checked={category === cat.toLowerCase()}
                        onChange={() =>
                          updateFilters("category", cat.toLowerCase())
                        }
                      />
                      <span className="ml-2">{cat}</span>
                    </label>
                  ),
                )}
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Location</h3>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => updateFilters("location", e.target.value)}
                    placeholder="Enter location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Restaurant Listings */}
          <div className="max-w-7xl mx-auto px-4 ">
            {isPending ? (
              <motion.div
                className="flex justify-center items-center h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {restaurants.map((restaurant, i) => (
                  <motion.div
                    key={restaurant._id}
                    variants={listItemVariants}
                    onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                    custom={i}
                    initial="initial"
                    animate="animate"
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <motion.img
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={restaurant.profileImage.secure_url}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          {restaurant.name}
                        </h3>
                        <motion.span
                          className="flex items-center text-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{restaurant.avgRating}</span>
                        </motion.span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {restaurant.categories?.join(", ") || "No categories"}
                      </p>
                      <p className="text-gray-500 text-sm mb-3">
                        {restaurant.address}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {restaurant.openingHours}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ExplorePage;
