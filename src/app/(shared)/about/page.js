'use client'
import React from "react";
import { motion } from "motion/react";

function About() {
  return (
    <div className="bg-gray-50 p-6 sm:p-8 md:p-12 mx-auto my-8 sm:my-12 md:my-16 rounded-lg shadow-lg max-w-full sm:max-w-lg md:max-w-3xl -mt-20 lg:mt-24 xl:mt-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          We represent sophisticated and timeless Scandinavian elegance through
          our collections of skillfully crafted leather goods and accessories of
          the finest quality. “Ny Morgen” is a Danish word meaning “New
          Morning”. Ny Morgen is a symbol of nature, strength and generosity 
          as depicted in our products, designed at Ny Morgen studio in Bangladesh, 
          Our team constantly focus on classical and functional design
          with a distinctly contemporary approach.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
           To design Ny Morgen products that
          would make women feel empowered and men feel confident in their life.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          Ny Morgen’s products are made with love and preserve the trend
          throughout the generation.
        </p>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="italic text-gray-500 text-sm sm:text-base mb-4">
          “Every Morning Comes in a NY Morgen”
        </p>
        <p className="italic text-gray-500 text-sm sm:text-base">
          “Reflect Your Personality”
        </p>
      </motion.div>
    </div>
  );
}

export default About;
