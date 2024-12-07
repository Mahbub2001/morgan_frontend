import Button1 from "@/containers/common/Button1/Button1";
import React from "react";

function BannerFirstPage() {
  return (
    <div className="relative bg-gray-800 h-[30rem] flex items-center z-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/first_banner.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content */}
      <div className="relative text-white pl-10 md:pl-20 lg:pl-32">
        <h1 className="text-3xl md:text-5xl font-bold">News</h1>
        <p className="text-lg md:text-2xl mt-2 italic mb-3">EXPLORE ALL OUR NEWS</p>
        <Button1 text="Shop Now" />
      </div>
    </div>
  );
}

export default BannerFirstPage;
