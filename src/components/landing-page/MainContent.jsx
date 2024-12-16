import React from "react";
import Navbar from "./Navbar";
import Swiper from "./Swiper";
import { Recommended_res } from "./Recommended_res";
import { Offers } from "./Offers";
import Footer from "./Footer";
export default function MainContent() {
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
