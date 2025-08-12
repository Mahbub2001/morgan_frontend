import React, { useState } from "react";
import { CgCheckO } from "react-icons/cg";
import { LuLeaf } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { SiAmazonsimpleemailservice } from "react-icons/si";

function ProductDetailFooter() {
  const features = [
    {
      icon: <CgCheckO />,
      title: "Crafted in Bangladesh",
      description: "Made in Small Batches",
    },
    {
      icon: <LuLeaf />,
      title: "Ethically Sourced",
      description: "Natural Veg Tan Leathers",
    },
    // {
    //   icon: <LiaShippingFastSolid />,
    //   title: "Shipping",
    //   description: "Free Shipping on Orders over £200",
    // },
    {
      icon: <SiAmazonsimpleemailservice />,
      title: "Customer Service",
      description: "Email info@nymorgen.com",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 50) {
      handleNext();
      setIsSwiping(false);
    } else if (diff < -50) {
      handlePrev();
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="md:py-6 font-futura-sans">
      <div className="container mx-auto text-center">
        <div
          className="relative h-40 sm:hidden overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`absolute w-full transition-transform duration-500 ease-in-out ${
                index === currentIndex
                  ? "translate-x-0"
                  : index < currentIndex
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div>{feature.icon}</div>
                <h3 className="text-md">{feature.title}</h3>
                <p className="text-sm text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2 sm:hidden">
          {features.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        {/* large screen */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-md">{feature.title}</h3>
              <p className="text-sm font-thin text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailFooter;
