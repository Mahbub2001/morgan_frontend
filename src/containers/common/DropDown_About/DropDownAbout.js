// components/Dropdown.js
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import Link from "next/link";

const Dropdown = ({ title, items, isVisible, closeDropdown, dropdownRef }) => {
  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scaleY(1)" : "scaleY(0)",
    config: { tension: 300, friction: 25 },
  });

  if (!isVisible) return null;

  return (
    <animated.div
      ref={dropdownRef}
      style={animation}
      className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5 origin-top"
    >
      <div className="container mx-auto flex justify-between ">
        <div>
          <p className="text-gray-700 text-sm">{title}</p>
          <ul className="space-y-2 mt-2">
            {items.map((item, index) => (
              <Link 
               onClick={closeDropdown}
                href={item?.link}
                key={index}
                className="block text-sm font-light cursor-pointer hover:bg-gray-200"
              >
                {item?.name}
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <ul className="gap-5 flex justify-center items-center">
            <li className="text-[0.6rem]">
              <p className="text-gray-700 text-sm cursor-pointer hover:border-b-2">
                Brand History
              </p>
              <div className="relative overflow-hidden">
                <img
                  style={{ height: "15rem", width: "11rem" }}
                  className="mt-3 cursor-pointer h-48"
                  src="images/brand-history.jpeg"
                  alt="news"
                />
              </div>
            </li>
            <li className="text-[0.6rem]">
              <p className="text-gray-700 text-sm cursor-pointer hover:border-b-2">
                Show Room
              </p>
              <div className="relative overflow-hidden">
                <img
                  style={{ height: "15rem", width: "11rem" }}
                  className="mt-3 cursor-pointer h-48"
                  src="images/showroom-1.jpeg"
                  alt="news"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </animated.div>
  );
};

export default Dropdown;
