import React from "react";
import bannerImg from "../../../public/assets/banner.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <img src={bannerImg} alt="banner" className="w-full object-cover h-96" />
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-left">
        <h1 className="text-white text-4xl font-bold mb-2">
          🌟 Dive into a Symphony of Flavor! 🌟
        </h1>
        <p className="text-white text-lg max-w-lg">
          Craving a delightful fusion of taste and vitality? Look no further!
          Our smoothies are brimming with luscious fruits, lush greens, and a
          burst of energy, all blended to perfection.
        </p>
      </div>
    </div>
  );
};

export default Banner;
