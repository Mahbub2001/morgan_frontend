'use client'
import React from "react";
import { motion } from "motion/react";

function Sustainability() {
  return (
    <div className="bg-white p-6 sm:p-8 md:p-12 mx-auto my-8 sm:my-12 md:my-16 rounded-lg shadow-lg max-w-full sm:max-w-lg md:max-w-3xl -mt-20 lg:mt-24 xl:mt-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Sustainability
        </h1>
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          Sustainability is so our style. We make the products you love in the
          most responsible way, from using green energy sources to monitoring
          our day-to-day practices including packaging and transport. Every step
          we make helps to protect the future of our planet.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          We always have our finger on the pulse of how we can make positive
          changes in our business and encourage change elsewhere. Ethically,
          environmentally, and socially. This makes a big difference in how we
          design, source, manufacture, and sell our products.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          Ny Morgen deeply associates with the great Nobel Peace Prize winner
          Prof. Muhammad Yunus, offering his vision of an emerging new economic
          system in his new book, <em>A World of Three Zeros</em>: “Zero
          Poverty, Zero Unemployment, and Zero Net Carbon Emissions”.
        </p>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="italic text-gray-500 text-sm sm:text-base">
          “Every step we take contributes to a brighter future.”
        </p>
      </motion.div>
    </div>
  );
}

export default Sustainability;
