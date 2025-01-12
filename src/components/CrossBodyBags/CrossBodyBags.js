import Button2 from "@/containers/common/Button2/Button2";
import Link from "next/link";
import React from "react";

function CrossbodyBags() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center place-items-center justify-between px-6 md:px-12 py-12 bg-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-thin font-serif italic mb-4">
            Morgen crossbody bags
          </h2>
          <p className="font-sans mb-6">
            Our crossbody bags are the perfect mix of style and functionality.
            With their practical design, they give you the freedom to have your
            hands free and will accompany you effortlessly throughout the day.
          </p>
          <Link
            href={{
              pathname: "/allproducts",
              query: { take: "/Women/Bags/Crossbody" },
            }}
          >
            <Button2 text="See More" />
          </Link>
        </div>
        <div className="">
          <img
            src="/images/cross1.jpg"
            alt="Crossbody bags"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default CrossbodyBags;
