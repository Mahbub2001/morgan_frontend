"use client";

import { insta } from "@/Data/ProductData";
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
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-[18rem] cursor-pointer object-cover rounded-lg"
                onClick={() => setSelectedImage(image)}
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
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full max-w-4xl h-auto"
              />
              <p className="text-center mt-4 text-sm text-gray-600">
                If you want to extend the strap and use Cathrine as a
                crossbody...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingInsta;
