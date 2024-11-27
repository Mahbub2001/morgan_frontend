import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Dropdown2 = ({ title, items, isVisible, closeDropdown, dropdownRef }) => {
  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scaleY(1)" : "scaleY(0)",
    config: { tension: 300, friction: 25 },
  });

  if (!isVisible) return null;

  return (
    <div>
      <animated.div
        ref={dropdownRef}
        style={animation}
        className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5 origin-top"
      >
        <div className="container mx-auto flex justify-between">
          <div>
            <p className="text-gray-700 text-sm">{title}</p>
            <ul className="space-y-2 mt-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="text-sm font-light cursor-pointer hover:bg-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <ul className="gap-5 flex justify-center items-center">
              <li className="text-[0.6rem]">
                <p className="text-gray-700 text-sm cursor-pointer hover:border-b-2">
                  Hero Style
                </p>
                <div className="relative overflow-hidden">
                  <img
                    className="mt-3 cursor-pointer object-cover"
                    style={{ height: "15rem", width: "11rem" }} 
                    src="images/brand-history.jpeg"
                    alt="news"
                  />
                </div>
              </li>
              <li className="text-[0.6rem]">
                <p className="text-gray-700 text-sm cursor-pointer hover:border-b-2">
                  Independent
                </p>
                <div className="relative overflow-hidden">
                  <img
                    className="mt-3 cursor-pointer object-cover"
                    style={{ height: "15rem", width: "11rem" }} 
                    src="images/showroom-1.jpeg"
                    alt="news"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Dropdown2;
