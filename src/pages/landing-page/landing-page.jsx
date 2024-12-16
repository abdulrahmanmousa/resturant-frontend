import React from "react";
import Navbar from "@/components/landing-page/Navbar";
import Swiper from "@/components/landing-page/Swiper";
import { Recommended_res } from "@/components/landing-page/RecommendedRestaurants";
import { Offers } from "@/components/landing-page/Offers";
import Footer from "@/components/landing-page/Footer";
export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Swiper />
      <Recommended_res />
      <Offers />
      <Footer />
    </div>
  );
}
