import Button1 from "@/containers/common/Button1/Button1";
import Link from "next/link";
import React from "react";

function BannerFirstPage(settings) {
  // console.log("Settings in BannerFirstPage:", settings);
  
  return (
    <div className="relative bg-gray-800 h-[30rem] flex items-center z-40">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/first_banner.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <div className="relative text-white pl-10 md:pl-20 lg:pl-32 ">
        <h1 className="text-3xl md:text-5xl font-bold">News</h1>
        <p className="text-lg md:text-2xl mt-2 italic mb-3">
          EXPLORE ALL OUR NEWS
        </p>
        <Link className="!z-50" href="/allproducts">
          <Button1 text="Shop Now" />
        </Link>
      </div>
    </div>
  );
}

export default BannerFirstPage;
