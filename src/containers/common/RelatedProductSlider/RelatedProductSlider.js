import React, { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./RelatedSlider.css";
import Link from "next/link";

const RelatedProductSlider = ({ productInfo, pictures }) => {
  console.log(productInfo);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const splideRef = useRef(null);

  const handlePrev = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNext = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  return (
    <div className="mt-10 relative">
      <Splide
        ref={splideRef}
        options={{
          type: "loop",
          perPage: 4,
          pagination: false,
          gap: 20,
          arrows: false,
          autoplay: true,
          breakpoints: {
            1200: { perPage: 4 },
            1024: { perPage: 3 },
            768: { perPage: 1 },
          },
        }}
        aria-label="Image Slider"
      >
        {pictures.map((src, index) => (
          <SplideSlide key={index}>
            <div>
              <Link
                href={{
                  pathname: `/allproducts/${productInfo[index]?._id}`,
                  query: { color: productInfo[index]?.color },
                }}
                className="flex justify-center cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  style={{
                    transition: "opacity 0.3s ease",
                    opacity: hoveredIndex === index ? 0.9 : 1,
                  }}
                  src={hoveredIndex === index ? src[1] : src[0]}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-48 object-cover rounded-sm shadow-sm"
                />
                {productInfo[index]?.discount > 0 && (
                  <div
                    style={{ backgroundColor: "#be834f" }}
                    className="absolute tracking-widest top-2 left-2 text-white text-xs font-thin px-2 py-1 rounded-sm"
                  >
                    SAVE €{" "}
                    {(productInfo[index]?.discount / 100) *
                      productInfo[index]?.askingPrice}
                  </div>
                )}
                {/* {productInfo[index]?.issoldOut && (
                  <div>
                    <div>

                    </div>
                  </div>
                )} */}
              </Link>
              <div>
                <p className="text-transform: uppercase tracking-widest text-gray-600 text-center pt-3 text-sm">
                  {productInfo[index]?.productName}
                </p>
                <div className="text-center pt-1 text-xs">
                  {productInfo[index]?.discount > 0 ? (
                    <div>
                      <span
                        style={{ color: "#be834f" }}
                        className="text-[#be834f]"
                      >
                        €{" "}
                        {Number.isInteger(
                          parseFloat(productInfo[index]?.askingPrice) -
                            (productInfo[index]?.discount / 100) *
                              parseFloat(productInfo[index]?.askingPrice)
                        )
                          ? `${Math.round(
                              parseFloat(productInfo[index]?.askingPrice) -
                                (productInfo[index]?.discount / 100) *
                                  parseFloat(productInfo[index]?.askingPrice)
                            )}.00`
                          : (
                              parseFloat(productInfo[index]?.askingPrice) -
                              (productInfo[index]?.discount / 100) *
                                parseFloat(productInfo[index]?.askingPrice)
                            ).toFixed(2)}
                      </span>
                      <span className="line-through text-gray-400 ml-2">
                        €{" "}
                        {Number.isInteger(
                          parseFloat(productInfo[index]?.askingPrice)
                        )
                          ? `${Math.round(
                              parseFloat(productInfo[index]?.askingPrice)
                            )}.00`
                          : parseFloat(productInfo[index]?.askingPrice).toFixed(
                              2
                            )}
                      </span>
                    </div>
                  ) : (
                    <p className="text-transform: uppercase tracking-widest text-gray-600">
                      €{" "}
                      {Number.isInteger(
                        parseFloat(productInfo[index]?.askingPrice)
                      )
                        ? `${Math.round(
                            parseFloat(productInfo[index]?.askingPrice)
                          )}.00`
                        : parseFloat(productInfo[index]?.askingPrice).toFixed(
                            2
                          )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      <button
        className="custom-arrow left-arrow"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <FaChevronLeft />
      </button>
      <button
        className="custom-arrow right-arrow"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default RelatedProductSlider;
