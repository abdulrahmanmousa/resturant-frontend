import React from "react";
import Navbar from "@/components/landing-page/Navbar";
import Swiper from "@/components/landing-page/Swiper";
import { Recommended_res } from "@/components/landing-page/RecommendedRestaurants";
import FeaturedDishes from "@/components/landing-page/FeaturedDishes";
import Footer from "@/components/landing-page/Footer";
import Rates from "@/components/landing-page/rates";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Swiper />
      <Recommended_res />
      <FeaturedDishes />
      <Rates />

      <Footer />
    </div>
  );
}
