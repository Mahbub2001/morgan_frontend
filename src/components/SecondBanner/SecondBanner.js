import Button1 from "@/containers/common/Button1/Button1";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function SecondBanner() {
  return (
    <div className="relative bg-gray-800 h-[30rem] flex items-center z-0 mt-20">
      <Image
        src="/images/pseudo.jpg"
        alt="Suede Collection"
        fill
        priority
        quality={70} // compress
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative text-white pl-10 md:pl-20 lg:pl-32">
        <h1 className="text-3xl md:text-5xl font-bold">Suede</h1>
        <p className="text-lg md:text-2xl mt-2 italic mb-3">
          EXPLORE OUR Suede Collection
        </p>
        <Link
          href={{
            pathname: "/allproducts",
            query: { take: "/Women/Bags/Suede" },
          }}
        >
          <Button1 text="Shop Now" />
        </Link>
      </div>
    </div>
  );
}

export default SecondBanner;
