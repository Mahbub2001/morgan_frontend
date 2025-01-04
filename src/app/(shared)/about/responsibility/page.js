"use client";
import React from "react";
import { motion } from "motion/react";

function Responsibility() {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 mx-auto my-6 sm:my-8 md:my-12 rounded-lg shadow-lg max-w-full sm:max-w-lg md:max-w-4xl -mt-20 lg:mt-24 xl:mt-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Responsibility
        </h1>
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          We are pretty proud of what we do. We are very much obsessive about
          feature, commitment, and an endless caring for aesthetics, quality,
          and art. Our each product is insured our uniqueness and Promises.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
          All our pieces are crafted ethically using premium sustainably sourced
          materials for their environmentally friendly properties, focusing on
          best practice processes and recycled and reused resources. We are
          strongly ensuring that no animal is killed for the sole purpose of
          making a bag.
        </p>
        <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base mt-4">
          This also supports our zero-waste policy, which ensures that no
          leather goes unused; leather offcuts are made for key rings, small
          purses, ornaments, reinforcements, and other add-ons, which is a core
          strategy of Ny Morgen.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 sm:mt-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="italic text-gray-500 text-sm sm:text-base">
          “A fund vaccines and treatments aimed to save the life of a child in
          need also contribute on education of young people in Bangladesh.”
        </p>
      </motion.div>
    </div>
  );
}

export default Responsibility;
