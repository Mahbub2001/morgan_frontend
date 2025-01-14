import React from "react";
import { motion } from "motion/react";

function SingleReviewsRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, index) => (
        <motion.svg
          key={`full-${index}`}
          className="h-4 w-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          variants={starVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </motion.svg>
      ))}
      {hasHalfStar && (
        <motion.svg
          className="h-4 w-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          variants={starVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: fullStars * 0.1, duration: 0.3 }}
        >
          <path d="M12 17.333V2.666c0-1.334-1.667-2-2.833-1.333L5.333 4.833 2.167 5.5C.833 5.833.833 7.333 2.167 8.167l3.166 2.667-1 4.166c-.5 1.5 1.167 2.833 2.5 2.167l3.333-1.667Z" />
        </motion.svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <motion.svg
          key={`empty-${index}`}
          className="h-4 w-4 text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          variants={starVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: (fullStars + hasHalfStar + index) * 0.1,
            duration: 0.3,
          }}
        >
          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </motion.svg>
      ))}
    </div>
  );
}

export default SingleReviewsRating;
