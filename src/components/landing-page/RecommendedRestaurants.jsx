import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import api from ".././../lib/apiInstance";

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

const titleVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
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

// Shimmer Loading Component
const ShimmerCard = ({ index }) => (
  <motion.div
    variants={listItemVariants}
    initial="initial"
    animate="animate"
    custom={index}
    className="basis-1/5 border-none shadow-none"
  >
    <div className="w-full animate-pulse">
      <div className="w-full h-[160px] bg-gray-200 rounded-3xl" />
      <div className="px-4 py-2">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </motion.div>
);

export function Recommended_res() {
  const { data, isPending } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => api.get(`/restaurants?limit=10&sortBy=avgRating`),
  });

  const restaurants = data?.data?.data?.restaurants || [];

  return (
    <motion.div
      className="mt-14"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1
        variants={titleVariants}
        className="text-4xl font-bold mb-6 text-center text-gray-800"
      >
        Recommended Restaurants
      </motion.h1>

      <Carousel className="w-3/4 m-auto">
        <CarouselContent className="flex gap-4">
          <AnimatePresence mode="wait">
            {isPending
              ? // Shimmer Loading
                Array(5)
                  .fill(0)
                  .map((_, index) => <ShimmerCard key={index} index={index} />)
              : restaurants.map((restaurant, index) => (
                  <CarouselItem
                    key={restaurant._id}
                    className="basis-1/5 border-none shadow-none"
                  >
                    <Link to={`/restaurants/${restaurant._id}`}>
                      <motion.div
                        variants={listItemVariants}
                        initial="initial"
                        animate="animate"
                        custom={index}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          scale: {
                            duration: 0.2,
                            ease: [0.23, 1, 0.32, 1],
                          },
                        }}
                      >
                        <Card className="w-full hover:bg-gray-200 transition-all rounded-3xl border-none shadow-none">
                          <div className="relative overflow-hidden">
                            <motion.img
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.4,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              src={restaurant.profileImage?.secure_url}
                              alt={restaurant.name}
                              className="w-full h-[160px] object-cover p-2 rounded-3xl"
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.2,
                                duration: 0.4,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1"
                            >
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">
                                {restaurant.avgRating
                                  ? restaurant.avgRating.toFixed(1)
                                  : "New"}
                              </span>
                            </motion.div>
                          </div>
                          <CardHeader className="px-4 py-2">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.3,
                                duration: 0.4,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                            >
                              <CardTitle>{restaurant.name}</CardTitle>
                              <CardDescription className="justify-start  flex mt-2 overflow-hidden">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600 text-center">
                                    {restaurant.address}
                                  </p>
                                  {restaurant.categories &&
                                    restaurant.categories.length > 0 && (
                                      <motion.div
                                        className="flex flex-wrap justify-center gap-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                          delay: 0.4,
                                          duration: 0.4,
                                        }}
                                      >
                                        {restaurant.categories.map(
                                          (category, idx) => (
                                            <motion.span
                                              key={idx}
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{
                                                delay: 0.4 + idx * 0.1,
                                                duration: 0.2,
                                                ease: [0.23, 1, 0.32, 1],
                                              }}
                                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                            >
                                              {category}
                                            </motion.span>
                                          ),
                                        )}
                                      </motion.div>
                                    )}
                                </div>
                              </CardDescription>
                            </motion.div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    </Link>
                  </CarouselItem>
                ))}
          </AnimatePresence>
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
}
