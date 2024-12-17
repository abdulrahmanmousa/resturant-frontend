import React from "react";
import Navbar from "./Navbar";
import Swiper from "./Swiper";
import { Recommended_res } from "./Recommended_res";
import Footer from "./Footer";
import FeaturedDishes from "./FeaturedDishes";
import Rates from "./rates";
export default function MainContent() {
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
