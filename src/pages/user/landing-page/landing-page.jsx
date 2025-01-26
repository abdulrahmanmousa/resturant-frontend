import React from "react";
import Navbar from "@/components/landing-page/Navbar";
import Swiper from "@/components/landing-page/Swiper";
import { Recommended_res } from "@/components/landing-page/RecommendedRestaurants";
import FeaturedDishes from "@/components/landing-page/FeaturedDishes";
import Footer from "@/components/landing-page/Footer";
import Rates from "@/components/landing-page/rates";
import Layout from "../../../components/layout/layout";
import FeaturedRestaurant from "@/components/landing-page/FeaturedRestaurant";

import { Star } from "lucide-react";
export default function LandingPage() {
  return (
    <Layout className="py-4">
      <Swiper />
      <Recommended_res />

      <div className="w-3/4 mx-auto my-8 flex  gap-8">
        <FeaturedRestaurant restaurantId={"67893206f4839ddf182d5e29"} />
        <FeaturedRestaurant restaurantId={"67957bc6c0c08e18ed55d32e"} />
      </div>
      <FeaturedDishes />
      {/* 
      <Rates />
      */}
    </Layout>
  );
}
