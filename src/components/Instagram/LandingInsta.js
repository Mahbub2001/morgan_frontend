"use client";

import { insta } from "@/Data/ProductData";
import Image from "next/image";
import React, { useState } from "react";

function LandingInsta() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="mt-20">
      <div className="px-6 py-12">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Follow us on Instagram
        </h2>
        <div className="flex flex-wrap justify-center gap-1">
          {insta.map((image, index) => (
            <div
              key={index}
              className="relative basis-1/3 sm:basis-1/4 md:basis-1/5 hover:opacity-40 transition-opacity"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={300} // thumbnail width
                height={300} // thumbnail height
                quality={70} // compress
                className="w-full h-[18rem] cursor-pointer object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 rounded-lg">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-2xl text-black"
              >
                &times;
              </button>
              <Image
                src={selectedImage}
                alt="Enlarged view"
                width={1200} // modal size
                height={800}
                quality={80} // keep a bit higher for large view
                className="w-full max-w-4xl h-[40rem] object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingInsta;
