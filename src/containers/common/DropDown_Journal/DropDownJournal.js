import React from "react";
import { motion, AnimatePresence } from "motion/react";

const Dropdown2 = ({ title, items, isVisible, closeDropdown, dropdownRef }) => {
  if (!isVisible) return null;
  const dropdownVariants = {
    hidden: { opacity: 0, scaleY: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scaleY: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <div>
      <motion.div
        variants={dropdownVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        ref={dropdownRef}
        // style={animation}
        className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5 origin-top"
      >
        <div className="container mx-auto flex justify-between">
          <div>
            <p className="text-gray-700 text-sm">{title}</p>
            <ul className="space-y-2 mt-2">
              {items.map((item, index) => (
                <motion.li
                  onClick={closeDropdown}
                  key={index}
                  variants={itemVariants}
                  className="text-sm font-light cursor-pointer hover:bg-gray-200"
                >
                  {item?.name}
                </motion.li>
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
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
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
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
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
      </motion.div>
    </div>
  );
};

export default Dropdown2;
